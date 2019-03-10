<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-10
 * Time: 08:04
 */

namespace App\Entity;

use Symfony\Component\Security\Core\User\UserInterface;

interface AuthoredEntityInterface
{
    public function setAuthor(UserInterface $user): AuthoredEntityInterface;
}
