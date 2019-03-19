<?php

use App\DataFixtures\PostFixtures;
use Behatch\Context\RestContext;
use Behatch\HttpCall\Request;
use Coduo\PHPMatcher\Factory\SimpleFactory;
use Doctrine\Common\DataFixtures\Executor\ORMExecutor;
use Doctrine\Common\DataFixtures\Purger\ORMPurger;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;

class FeatureContext extends RestContext
{
    const USERS = [
        'admin' => 'secret123#'
    ];
    const AUTH_URL = '/api/login_check';
    const AUTH_JSON = '
        {
            "username": "%s",
            "password": "%s"
        }
    ';

    /**
     * @var PostFixtures
     */
    private $fixtures;

    /**
     * @var \Coduo\PHPMatcher\Matcher
     */
    private $matcher;

    /**
     * @var EntityManagerInterface
     */
    private $manager;

    /**
     * FeatureContext constructor.
     *
     * @param Request $request
     * @param PostFixtures $fixtures
     * @param EntityManagerInterface $manager
     */
    public function __construct(Request $request, PostFixtures $fixtures, EntityManagerInterface $manager)
    {
        parent::__construct($request);
        $this->fixtures = $fixtures;
        $this->matcher = (new SimpleFactory())->createMatcher();
        $this->manager = $manager;
    }

    /**
     * @Given I am authenticated as :user
     *
     * @param $user
     */
    public function iAmAuthenticatedAs($user)
    {
        $this->request->setHttpHeader('Content-Type', 'application/ld+json');
        $this->request->send(
            'POST',
            $this->locatePath(self::AUTH_URL),
            [],
            [],
            sprintf(self::AUTH_JSON, $user, self::USERS[$user])
        );

        $json = json_decode($this->request->getContent(), true);

        // Make sure the token was returned
        $this->assertTrue(isset($json['token']));

        $token = $json['token'];

        $this->request->setHttpHeader('Authorization', 'Bearer '.$token);
    }

    /**
     * @BeforeScenario @createSchema
     */
    public function createSchema()
    {
        // Get entity metadata
        $classes = $this->manager->getMetadataFactory()->getAllMetadata();

        // Drop and create schema
        $schemaTool = new SchemaTool($this->manager);
        $schemaTool->dropSchema($classes);
        $schemaTool->createSchema($classes);

        // Load Fixtures
        $purger = new ORMPurger($this->manager);
        $fixturesExecutor = new ORMExecutor($this->manager, $purger);

        $fixturesExecutor->execute([$this->fixtures]);
    }
}
