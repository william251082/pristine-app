<?php

namespace App\DataFixtures;

use App\Entity\Post;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class PostFixtures extends Fixture
{
    /**
     * @param ObjectManager $manager
     * @throws
     */
    public function load(ObjectManager $manager)
    {
        $post = new Post();
        $post->setTitle('Post');
        $post->setPublished(new DateTime('2018-07-01T12:00:00+00:00'));
        $post->setContent('hi world');
        $post->setAuthor('Will');
        $post->setSlug('hi-world');

        $manager->persist($post);

        $post = new Post();
        $post->setTitle('Post2');
        $post->setPublished(new DateTime('2018-07-01T12:00:00+00:00'));
        $post->setContent('hi world');
        $post->setAuthor('Will');
        $post->setSlug('hi-world2');

        $manager->persist($post);

        $manager->flush($post);
    }
}
