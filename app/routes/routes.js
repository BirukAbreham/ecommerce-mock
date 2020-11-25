module.exports = (app) => {
  const items = require("../controllers/items.controller");

  let router = require("express").Router();

  // Create item
  router.post("/items/", items.create);

  // Find all items
  router.get("/items/", items.findAll);

  // Find a single item
  router.get("/items/:id", items.findOne);

  // Update an item
  router.put("/items/:id", items.update);

  // Delete an item
  router.delete("/items/:id", items.delete);

  app.use("/api", router);
};
