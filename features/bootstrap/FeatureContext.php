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
    public function __construct(Request $request, PostFixtures $fixtures, EntityManagerInterface $manager) {
        parent::__construct($request);
        $this->fixtures = $fixtures;
        $this->matcher = (new SimpleFactory())->createMatcher();
        $this->manager = $manager;
    }

    /**
     * @BeforeScenario @createShema
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
