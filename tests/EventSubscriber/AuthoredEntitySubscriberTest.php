<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-18
 * Time: 22:20
 */

namespace App\Tests\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Post;
use App\Entity\User;
use App\EventSubscriber\AuthoredEntitySubscriber;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class AuthoredEntitySubscriberTest extends TestCase
{
    public function testConfiguration()
    {
        $result = AuthoredEntitySubscriber::getSubscribedEvents();

        $this->assertArrayHasKey(KernelEvents::VIEW, $result);
        $this->assertEquals(
            ['getAuthenticatedUser', EventPriorities::PRE_WRITE],
            $result[KernelEvents::VIEW]
        );
    }

    public function testSetAuthorCall()
    {
        $tokenStorageMock = $this->getTokenStorageMock();

        $eventMock = $this->getEventMock();

        (new AuthoredEntitySubscriber($tokenStorageMock))->getAuthenticatedUser($eventMock);
    }

    /**
     * @return \PHPUnit\Framework\MockObject\MockObject
     */
    protected function getTokenStorageMock(): \PHPUnit\Framework\MockObject\MockObject
    {
        $tokenMock = $this
            ->getMockBuilder(TokenInterface::class)
            ->getMockForAbstractClass();
        $tokenMock
            ->expects($this->once())
            ->method('getUser')
            ->willReturn(new User());

        $tokenStorageMock = $this
            ->getMockBuilder(TokenStorageInterface::class)
            ->getMockForAbstractClass();

        $tokenStorageMock
            ->expects($this->once())
            ->method('getToken')
            ->willReturn($tokenMock);

        return $tokenStorageMock;
    }

    /**
     * @return \PHPUnit\Framework\MockObject\MockObject
     */
    protected function getEventMock(): \PHPUnit\Framework\MockObject\MockObject
    {
        $eventMock = $this
            ->getMockBuilder(GetResponseForControllerResultEvent::class)
            ->disableOriginalConstructor()
            ->getMock();

        $eventMock
            ->expects($this->never())
            ->method('getControllerResult')
            ->willReturn(new Post());

        return $eventMock;
    }
}