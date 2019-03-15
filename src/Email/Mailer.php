<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-15
 * Time: 18:37
 */

namespace App\Email;

use App\Entity\User;

class Mailer
{
    /**
     * @var \Swift_Mailer
     */
    private $mailer;

    /**
     * @var \Twig_Environment
     */
    private $twig;

    /**
     * Mailer constructor.
     *
     * @param \Swift_Mailer $mailer
     * @param \Twig_Environment $twig
     */
    public function __construct(\Swift_Mailer $mailer, \Twig_Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function sendConfirmationEmail(User $user)
    {
        $body = $this->twig->render(
            'email/confirmation.html.twig',
            [
                'user' => $user
            ]
        );

        $message = (new \Swift_Message('Hello from blog api'))
            ->setFrom('william@xlab.nl')
            ->setTo($user->getEmail())
            ->setBody($body);

        $this->mailer->send($message);
    }
}
