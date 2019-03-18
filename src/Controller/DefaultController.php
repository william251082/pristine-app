<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-07
 * Time: 07:01
 */

namespace App\Controller;

use App\Security\UserConfirmationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/")
 */
class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default_index")
     */
    public function index()
    {
        return $this->render(
            'base.html.twig'
        );
    }

    /**
     * @Route("/confirm-user/{token}", name="default_confirm_token")
     *
     * @param string $token
     * @param UserConfirmationService $userConfirmationService
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     * @throws \App\Exception\InvalidConfirmationTokenException
     */
    public function confirmUser(string $token, UserConfirmationService $userConfirmationService)
    {
        $userConfirmationService->confirmUser($token);

        return $this->redirectToRoute('default_index');
    }
}
