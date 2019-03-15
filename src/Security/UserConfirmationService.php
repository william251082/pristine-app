<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-15
 * Time: 18:47
 */

namespace App\Security;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserConfirmationService
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * UserConfirmationService constructor.
     *
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
        UserRepository $userRepository,
        EntityManagerInterface $entityManager
    ) {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @param string $confirmationToken
     */
    public function confirmUser(string $confirmationToken)
    {
        $user = $this->userRepository->findOneBy(
            ['confirmationToken' => $confirmationToken]
        );

        // User was NOT found by confirmation Token
        if (!$user) {
            throw new NotFoundHttpException();
        }

        $user->setEnabled(true);
        $user->setConfirmationToken(null);
        $this->entityManager->flush();
    }
}
