<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-07
 * Time: 06:29
 */

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogController
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
    private const POSTS = [
        [
            'id' => 1,
            'slug' => 'hello-world',
            'title' => 'Hello World!',
        ],
        [
            'id' => 2,
            'slug' => 'hello-world2',
            'title' => 'Hello World2!',
        ],
        [
            'id' => 3,
            'slug' => 'hello-world3',
            'title' => 'Hello World3!',
        ]
    ];

    /**
     * @Route("/", name="blog_list")
     * @param int $page
     *
     * @return JsonResponse
     */
    public function list($page = 1)
    {
        return new JsonResponse(
            [
            'page' => $page,
            'data' => self::POSTS,
            ]
        );
    }

    /**
     * @Route("/post/{id}", name="blog_by_id", requirements={"id"="\d+"})
     * @param $id
     *
     * @return JsonResponse
     */
    public function post($id)
    {
        return new JsonResponse(
            self::POSTS[array_search($id, array_column(self::POSTS, 'id'))]
        );
    }

    /**
     * @Route("/post/{slug}", name="blog_by_slug")
     * @param $slug
     *
     * @return JsonResponse
     */
    public function postBySlug($slug)
    {
        return new JsonResponse(
            self::POSTS[array_search($slug, array_column(self::POSTS, 'slug'))]
        );
    }
}
