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

  // Sign up
  router.post("/auth/singup", users.signup);

  // Sign in
  router.post("/auth/login", users.singin);

  // Create item
  router.post("/items/", [authJwt], items.create);

  // Find all items
  router.get("/items/", [authJwt], items.findAll);

  // Find a single item
  router.get("/items/:id", [authJwt], items.findOne);

  // Update an item
  router.put("/items/:id", [authJwt], items.update);

  // Delete an item
  router.delete("/items/:id", [authJwt], items.delete);

  app.use("/api", router);
};
