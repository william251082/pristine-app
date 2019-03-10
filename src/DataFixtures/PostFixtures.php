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

    private const USERS = [
        [
            'username' => 'admin',
            'email' => 'admin@blog.com',
            'name' => 'Piotr Jura',
            'password' => 'secret123#'
        ],
        [
            'username' => 'john_doe',
            'email' => 'john@blog.com',
            'name' => 'John Doe',
            'password' => 'secret123#'
        ],
        [
            'username' => 'rob_smith',
            'email' => 'rob@blog.com',
            'name' => 'Rob Smith',
            'password' => 'secret123#'
        ],
        [
            'username' => 'jenny_rowling',
            'email' => 'jenny@blog.com',
            'name' => 'Jenny Rowling',
            'password' => 'secret123#'
        ],
        [
            'username' => 'han_solo',
            'email' => 'han@blog.com',
            'name' => 'Han Solo',
            'password' => 'secret123#'
        ],
        [
            'username' => 'jedi_knight',
            'email' => 'jedi@blog.com',
            'name' => 'Jedi Knight',
            'password' => 'secret123#'
        ],
    ];

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

            $authorReference = $this->getRandomUserReference();

            $post->setAuthor($authorReference);
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

                $authorReference = $this->getRandomUserReference();

                $comment->setAuthor($authorReference);
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
        foreach (self::USERS as $userFixture) {
            $user = new User();
            $user->setUsername($userFixture['username']);
            $user->setEmail($userFixture['email']);
            $user->setName($userFixture['name']);
            $user->setPassword($this->passwordEncoder->encodePassword($user, $userFixture['password']));

            $this->addReference('user_' . $userFixture['username'], $user);

            $manager->persist($user);
        }

        $manager->flush();
    }

    /**
     * @return User
     */
    protected function getRandomUserReference(): User
    {
        return $this->getReference('user_'.self::USERS[rand(0, 3)]['username']);
    }
}
