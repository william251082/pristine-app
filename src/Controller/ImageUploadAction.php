<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-17
 * Time: 06:45
 */

namespace App\Controller;

use ApiPlatform\Core\Validator\Exception\ValidationException;
use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\Image;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

class ImageUploadAction
{
    /**
     * @var FormFactoryInterface
     */
    private $formFactory;

    /**
     * @var EntityManager
     */
    private $entityManager;
    
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * ImageUploadAction constructor.
     *
     * @param FormFactoryInterface $formFactory
     * @param EntityManager $entityManager
     * @param ValidatorInterface $validator
     */
    public function __construct(
        FormFactoryInterface $formFactory,
        EntityManager $entityManager,
        ValidatorInterface $validator
    ) {
        $this->formFactory = $formFactory;
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    /**
     * @param Request $request
     *
     * @return Image
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function __invoke(Request $request)
    {
        // Create a new Image instance
        $image = new Image();

        // Validate the form
        $form = $this->formFactory->create(null, $image);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Persist the new Image entity
            $this->entityManager->persist($image);
            $this->entityManager->flush();

            return $image;
        }

        // Uploading done for us in the background by VichUploader

        // Throw an validation exception that means something went wrong during form validation
        throw new ValidationException(
            $this->validator->validate($image)
        );
    }
}
