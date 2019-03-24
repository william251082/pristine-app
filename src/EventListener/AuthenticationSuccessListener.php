<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-24
 * Time: 07:30
 */

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();

        $user = $event->getUser();

        if (!$user instanceof User) {
            return;
        }

        $data['id'] = $user->getId();

        $event->setData($data);
    }
}
