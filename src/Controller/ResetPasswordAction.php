<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-15
 * Time: 07:01
 */

namespace App\Controller;

use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Entity\User;

class ResetPasswordAction
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * ResetPasswordAction constructor. Manually validate data inside this action.
     *
     * @param ValidatorInterface $validator
     */
    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function __invoke(User $data)
    {
        // $reset = new ResetPasswordAction();
        // $reset();
//        var_dump(
//            $data->getNewPassword(),
//            $data->getNewRetypedPassword(),
//            $data->getOldPassword(),
//            $data->getRetypedPassword()
//        );
//        die();

        $this->validator->validate($data);

        // Validator is only called after we return the data from this action
    }
}
