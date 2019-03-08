<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-07
 * Time: 06:29
 */

namespace App\Controller;

use App\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
     * @Route("/{page}", name="blog_list", defaults={"page": 5}, requirements={"page"="\d+"})
     * @param Request $request
     * @param int $page
     *
     * @return JsonResponse
     */
    public function list(Request $request, $page = 1)
    {
        $limit = $request->get('limit', 10);

        return $this->json(
            [
                'page' => $page,
                'limit' => $limit,
                'data' => array_map(function ($item) {
                    return $this->generateUrl('blog_by_id', ['id' => $item['id']]);
                }, self::POSTS)
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
        return $this->json(
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
        return $this->json(
            self::POSTS[array_search($slug, array_column(self::POSTS, 'slug'))]
        );
    }

    /**
     * @Route("/add", name="blog_add", methods={"POST"})
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function add(Request $request)
    {
        $serializer = $this->get('serializer');

        $blogPost = $serializer->deserialize($request->getContent(), Post::class, 'json');

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($blogPost);
        $manager->flush();

        return $this->json($blogPost);
    }
}
