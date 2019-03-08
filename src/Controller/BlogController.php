<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-07
 * Time: 06:29
 */

namespace App\Controller;

use App\Entity\Post;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Tests\B;

/**
 * Class BlogController
 * @Route("/blog")
 */
class BlogController extends AbstractController
{
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
        $repository = $this->getDoctrine()->getRepository(Post::class);
        $items = $repository->findAll();

        return $this->json(
            [
                'page' => $page,
                'limit' => $limit,
                'data' => array_map(function (Post $item) {
                    return $this->generateUrl('blog_by_slug', ['slug' => $item->getSlug()]);
                }, $items)
            ]
        );
    }

    /**
     * @Route("/post/{id}", name="blog_by_id", requirements={"id"="\d+"})
     * @ParamConverter("post", class="App:Post")
     * @param Post $post
     *
     * @return JsonResponse
     */
    public function post($post)
    {
        // Same as doing find($id) on repository
        return $this->json($post);
    }

    /**
     * @Route("/post/{slug}", name="blog_by_slug")
     * Another option to paramConverter is to type hint
     * @ParamConverter("post", class="App:Post", options={"mapping": {"slug": "slug"}})
     * @param Post $post
     *
     * @return JsonResponse
     */
    public function postBySlug($post)
    {
        // Same as doing findOneBy(['slug' => $slug]) on repository
        return $this->json($post);
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
