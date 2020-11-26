module.exports = (app) => {
  const authJwt = require("../middleware/authJwt");
  const users = require("../controllers/users.controller");
  const items = require("../controllers/items.controller");

  let router = require("express").Router();

  // header check
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /**
   * @swagger
   * /api/auth/singup:
   *  post:
   *    tags:
   *      - Users
   *    summary: Creates a new user
   *    description: Creates a new user
   *    produces:
   *      - application/json
   *    consumes:
   *      - application/json
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - username
   *              - password
   *            properties:
   *              username:
   *                type: string
   *              password:
   *                type: string
   *    responses:
   *      '201':
   *        description: A json message
   *      400:
   *        description: Error message if body is empty or username already exists
   *      5xx:
   *        description: Unexpected error.
   */
  router.post("/auth/singup", users.signup);

  /**
   * @swagger
   * paths:
   *  /api/auth/login:
   *    post:
   *      tags:
   *        - Users
   *      summary: Login as a user
   *      description: Login a user
   *      consumes:
   *        - application/json
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - username
   *                - password
   *              properties:
   *                username:
   *                  type: string
   *                password:
   *                  type: string
   *      responses:
   *        200:
   *          description: Success
   *        401:
   *          description: Authorization information is missing or invalid.
   *        404:
   *          description: A user with the specified ID was not found.
   *        5XX:
   *          description: Unexpected error.
   */
  router.post("/auth/login", users.singin);

  /**
   * @swagger
   * paths:
   *  /api/items:
   *    post:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Items
   *      summary: Add an item to database
   *      description: Add an item to database
   *      consumes:
   *        - application/json
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - name
   *                - price
   *                - description
   *                - vendorName
   *              properties:
   *                name:
   *                  type: string
   *                price:
   *                  type: number
   *                  format: double
   *                description:
   *                  type: string
   *                vendorName:
   *                  type: string
   *      responses:
   *        201:
   *          description: Created an item successfully
   *        401:
   *          description: Authorization information is missing or invalid.
   *        400:
   *          description: Bad request
   *        5XX:
   *          description: Unexpected error.
   */
  router.post("/items/", [authJwt], items.create);

  /**
   * @swagger
   * paths:
   *  /api/items:
   *    get:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Items
   *      summary: Get list of available items
   *      description: Get list of available items
   *      parameters:
   *        - in: query
   *          name: sort
   *          schema:
   *            type: string
   *          description: valid values are 'desc' or 'asc, order by price
   *      responses:
   *        200:
   *          description: Success
   *        401:
   *          description: Authorization information is missing or invalid.
   *        5XX:
   *          description: Unexpected error.
   */
  router.get("/items/", [authJwt], items.findAll);

  /**
   * @swagger
   * paths:
   *  /api/items/{id}:
   *    get:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Items
   *      summary: Get a single item
   *      description: Get a single item
   *      parameters:
   *        - name: id
   *          in: path
   *          description: Item ID
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      responses:
   *        200:
   *          description: Success
   *        401:
   *          description: Authorization information is missing or invalid.
   *        5XX:
   *          description: Unexpected error.
   */
  router.get("/items/:id", [authJwt], items.findOne);

  /**
   * @swagger
   * paths:
   *  /api/items/{id}:
   *    put:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Items
   *      summary: Update item information
   *      description: AUpdate item information
   *      consumes:
   *        - application/json
   *      parameters:
   *        - name: id
   *          in: path
   *          description: Item ID
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - name
   *                - price
   *                - description
   *                - vendorName
   *              properties:
   *                name:
   *                  type: string
   *                price:
   *                  type: number
   *                  format: double
   *                description:
   *                  type: string
   *                vendorName:
   *                  type: string
   *      responses:
   *        200:
   *          description: Updated an item Successfully
   *        400:
   *          description: Bad request
   *        401:
   *          description: Authorization information is missing or invalid.
   *        5XX:
   *          description: Unexpected error.
   */
  router.put("/items/:id", [authJwt], items.update);

  /**
   * @swagger
   * paths:
   *  /api/items/{id}:
   *    delete:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Items
   *      summary: Delete item information
   *      description: Delete item information
   *      consumes:
   *        - application/json
   *      parameters:
   *        - name: id
   *          in: path
   *          description: Item ID
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      responses:
   *        200:
   *          description: Updated an item Successfully
   *        400:
   *          description: Bad request
   *        401:
   *          description: Authorization information is missing or invalid.
   *        5XX:
   *          description: Unexpected error.
   */
  router.delete("/items/:id", [authJwt], items.delete);

  // Add items to cart
  // router.post("/user/:userid/cart", [authJwt], carts.create)

  // Get cart detail information
  // router.get("/user/:userid/cart", [authJwt], carts.findOne)

  // Update or remove item form cart
  // router.put("/users/:userid/cart", [authJwt], carts.update)

  // Delete or remove item from cart
  // router.delete("/users/:userid/cart/:itemid", [authJwt], carts.delete)

  app.use("/api", router);
};
