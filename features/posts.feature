Feature: Manage posts
  @createSchema @post @comment
  Scenario: Create a Post
    Given I am authenticated as "admin"
    When  I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/posts" with body:
    """
    {
      "title": "Hello a title",
      "content": "The content is suppose to be at least 20 characters",
      "slug": "a-new-slug"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON matches expected template:
    """
    {
      "@context": "/api/contexts/Post",
      "@id": "@string@",
      "@type": "Post",
      "comments": [],
      "id": @integer@,
      "title": "Hello a title",
      "content": "The content is suppose to be at least 20 characters",
      "slug": "a-new-slug",
      "published": "@string@.isDateTime()",
      "author": "/api/users/1",
      "images": []
    }
    """

  @comment
  Scenario: Add comment to the new post
    Given I am authenticated as "admin"
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/comments" with body:
    """
    {
      "content": "It's a first comment published to this post?",
      "post": "/api/posts/101"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON matches expected template:
    """
    {
      "@context": "/api/contexts/Comment",
      "@id": "@string@",
      "@type": "Comment",
      "id": @integer@,
      "content": "It\u0027s a first comment published to this post?",
      "published": "@string@.isDateTime()",
      "author": "/api/users/1",
      "post": "/api/posts/101"
    }
    """

  @comment
  Scenario: Read recently added post comments
    When I add "Accept" header equal to "application/ld+json"
    And I send a "GET" request to "/api/posts/101/comments"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON matches expected template:
    """
    {
      "@context":"/api/contexts/Comment",
      "@id":"/api/posts/101/comments",
      "@type":"hydra:Collection",
      "hydra:member":[
        {
          "@id": "@string@",
          "@type": "Comment",
          "id": @integer@,
          "content": "It\u0027s a first comment published to this post?",
          "published": "@string@.isDateTime()",
          "author": {
            "@id": "/api/users/1",
            "@type": "User",
            "username": "admin",
            "name": "Piotr Jura"
          }
        }
      ],
      "hydra:totalItems":1
    }
    """

  @comment
  Scenario: Throws error when comment is invalid
    Given I am authenticated as "admin"
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/comments" with body:
    """
    {
      "content": "",
      "blogPost": "/api/posts/105"
    }
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the JSON matches expected template:
    """
    {
        "@context": "/api/contexts/ConstraintViolationList",
        "@type": "ConstraintViolationList",
        "hydra:title": "An error occurred",
        "hydra:description": "content: This value should not be blank.",
        "violations":
        [
          {
            "propertyPath": "content",
            "message": "This value should not be blank."
          }
        ]
      }
    """

  @createSchema
  Scenario: Throws an error when post is invalid
    Given I am authenticated as "admin"
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/blog_posts" with body:
    """
    {
      "title": "",
      "content": "",
      "slug": "a-new-slug"
    }
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the JSON matches expected template:
    """
    {
    "@context": "/api/contexts/ConstraintViolationList",
    "@type": "ConstraintViolationList",
    "hydra:title": "An error occurred",
    "hydra:description": "title: This value should not be blank.\ncontent: This value should not be blank.",
    "violations":
      [
        {
            "propertyPath": "title",
            "message": "This value should not be blank."
        },
        {
            "propertyPath": "content",
            "message": "This value should not be blank."
        }
      ]
    }
  """

  Scenario: Throws an error when user is not authenticated
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/posts" with body:
    """
    {
      "title": "",
      "content": "",
      "slug": "a-new-slug"
    }
    """
    Then the response status code should be 401

