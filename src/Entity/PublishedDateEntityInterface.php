<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-10
 * Time: 08:12
 */

namespace App\Entity;

use DateTimeInterface;

interface PublishedDateEntityInterface
{
    public function setPublished(DateTimeInterface $published): PublishedDateEntityInterface;
}
