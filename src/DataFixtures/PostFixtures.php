<?php

namespace App\DataFixtures;

use App\Entity\Post;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PostFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @param ObjectManager $manager
     * @throws
     */
    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
        $this->loadPosts($manager);
    }

    /**
     * @param ObjectManager $manager
     *
     * @throws \Exception
     */
    public function loadPosts(ObjectManager $manager)
    {
        $user = $this->getReference('admin_user');

        $post = new Post();
        $post->setTitle('Post');
        $post->setPublished(new DateTime('2018-07-01T12:00:00+00:00'));
        $post->setContent('hi world');
        $post->setAuthor($user);
        $post->setSlug('hi-world');

        $manager->persist($post);

        $post = new Post();
        $post->setTitle('Post2');
        $post->setPublished(new DateTime('2018-07-01T12:00:00+00:00'));
        $post->setContent('hi world');
        $post->setAuthor($user);
        $post->setSlug('hi-world2');

        $manager->persist($post);

        $manager->flush($post);
    }

    public function loadComments(ObjectManager $manager)
    {
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
        $this->addReference('admin_user', $user);

        $manager->persist($user);
        $manager->flush();
    }
}
