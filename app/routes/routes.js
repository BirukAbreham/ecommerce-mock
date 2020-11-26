module.exports = (app) => {
  const authJwt = require("../middleware/authJwt");
  const users = require("../controllers/users.controller");
  const items = require("../controllers/items.controller");
  const carts = require("../controllers/carts.controller");

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
   *      500:
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
   *        500:
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
   *        500:
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
   *        500:
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
   *        500:
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
   *        500:
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
   *        500:
   *          description: Unexpected error.
   */
  router.delete("/items/:id", [authJwt], items.delete);

  /**
   * @swagger
   * paths:
   *  /api/cart/{userid}/item:
   *    post:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Carts
   *      summary: create a cart and add multiple items to the cart
   *      description: create a cart and add multiple items to the cart
   *      consumes:
   *        - application/json
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              required:
   *                - items
   *              properties:
   *                items:
   *                  type: array
   *                  items:
   *                    type: object
   *                    properties:
   *                      itemid:
   *                        type: integer
   *                      quantity:
   *                        type: integer
   *      parameters:
   *        - name: userid
   *          in: path
   *          description: User Id
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      responses:
   *        201:
   *          description: Created a cart successfully
   *        401:
   *          description: Authorization information is missing or invalid.
   *        400:
   *          description: Bad request
   *        500:
   *          description: Unexpected error.
   */
  router.post("/cart/:userid/item", [authJwt], carts.create);

  /**
   * @swagger
   * paths:
   *  /api/cart/{userid}:
   *    get:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Carts
   *      summary: Get detail information of cart
   *      description: Get detail information of cart
   *      parameters:
   *        - name: userid
   *          in: path
   *          description: User Id
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      responses:
   *        200:
   *          description: Success
   *        401:
   *          description: Authorization information is missing or invalid.
   *        404:
   *          description: User does not exist
   *        500:
   *          description: Unexpected error.
   */
  router.get("/cart/:userid", [authJwt], carts.findOne);

  /**
   * @swagger
   * paths:
   *  /api/cart/{userid}/item/{itemid}:
   *    put:
   *      security:
   *        - ApiKeyAuth: []
   *      tags:
   *        - Carts
   *      summary: Remove item from cart
   *      description: Remove item from cart
   *      parameters:
   *        - name: userid
   *          in: path
   *          description: User Id
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *        - name: itemid
   *          in: path
   *          description: Item Id
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      responses:
   *        200:
   *          description: Success
   *        401:
   *          description: Authorization information is missing or invalid.
   *        400:
   *          description: Could not remove item from cart
   *        500:
   *          description: Unexpected error.
   */
  router.put("/cart/:userid/item/:itemid", [authJwt], carts.update);

  app.use("/api", router);
};
