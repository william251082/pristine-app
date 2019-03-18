<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-18
 * Time: 09:47
 */

namespace App\Exception;

use Throwable;

class EmptyBodyException extends \Exception
{
    public function __construct(string $message = "", int $code = 0, Throwable $previous = null)
    {
        parent::__construct('The body of POST/PUT can not be empty', $code, $previous);
    }
}
