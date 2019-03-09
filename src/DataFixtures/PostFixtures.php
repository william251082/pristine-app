<?php

namespace App\DataFixtures;

use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PostFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * @var Factory
     */
    private $faker;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->faker = Factory::create();
    }

    /**
     * @param ObjectManager $manager
     * @throws
     */
    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
        $this->loadPosts($manager);
        $this->loadComments($manager);
    }

    /**
     * @param ObjectManager $manager
     *
     * @throws \Exception
     */
    public function loadPosts(ObjectManager $manager)
    {
        $user = $this->getReference('user_admin');

        for ($i = 0; $i < 100; $i++) {
            $post = new Post();
            $post->setTitle($this->faker->realText(30));
            $post->setPublished($this->faker->dateTimeThisYear);
            $post->setContent($this->faker->realText());
            $post->setAuthor($user);
            $post->setSlug($this->faker->slug);

            $this->setReference("post_$i", $post);

            $manager->persist($post);
        }

        $manager->flush();
    }

    public function loadComments(ObjectManager $manager)
    {
        for ($i = 0; $i < 100; $i++) {
            for ($j = 0; $j < rand(1, 10); $j++) {
                $comment = new Comment();
                $comment->setContent($this->faker->realText(30));
                $comment->setPublished($this->faker->dateTimeThisYear);
                $comment->setContent($this->faker->realText());
                $comment->setAuthor($this->getReference('user_admin'));
                $comment->setPost($this->getReference("post_$i"));

                $manager->persist($comment);
            }
        }

        $manager->flush();
    }

    /**
     * @param ObjectManager $manager
     */
    public function loadUsers(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername('admin');
        $user->setEmail('admin@blog.com');
        $user->setName('Will');
        $user->setPassword($this->passwordEncoder->encodePassword($user, 'secret'));
        $this->addReference('user_admin', $user);

        $manager->persist($user);
        $manager->flush();
    }
}
