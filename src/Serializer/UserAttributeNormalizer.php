<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-14
 * Time: 07:37
 */

namespace App\Serializer;

use App\Entity\User;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizableInterface;
use Symfony\Component\Serializer\SerializerAwareInterface;
use Symfony\Component\Serializer\SerializerAwareTrait;

class UserAttributeNormalizer implements ContextAwareNormalizerInterface, SerializerAwareInterface
{
    use SerializerAwareTrait;

    const USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED = 'USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED';

    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * UserAttributeNormalizer constructor.
     *
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param $data
     * @param null $format
     * @param array $context options that normalizers have access to
     *
     * @return bool
     */
    public function supportsNormalization($data, $format = null, array $context = [])
    {
        if (isset($context[self::USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof User;
    }

    /**
     * Normalizes an object into a set of arrays/scalars.
     *
     * @param mixed $object
     * @param null $format
     * @param array $context
     *
     * @return array|bool|float|int|string
     */
    public function normalize($object, $format = null, array $context = [])
    {
        if ($this->isUserHimself($object)) {
            $context['groups'][] = 'get-owner';
        }

        // Continue with serialization
        return $this->passOn($object, $format, $context);
    }

    /**
     * @param $object
     *
     * @return bool
     */
    private function isUserHimself($object)
    {
        return $object->getUsername() === $this->tokenStorage->getToken()->getUsername();
    }

    /**
     * @param $object
     * @param string|null $format
     * @param array $context
     *
     * @return array|bool|float|int|string
     */
    private function passOn($object, ?string $format, array $context)
    {
        if (!$this->serializer instanceof NormalizableInterface) {
            throw new  \LogicException(
                'Cannot normalize object "%s" because the injected serializer is not a normalizer.',
                $object
            );
        }

        $context[self::USER_ATTRIBUTE_NORMALIZER_ALREADY_CALLED] = true;

        return $this->serializer->normalize($object, $format, $context);
    }
}
