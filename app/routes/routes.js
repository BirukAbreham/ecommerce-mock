module.exports = (app) => {
  const items = require("../controllers/items.controller");

  let router = require("express").Router();

  // Create item
  router.post("/items/", items.create);

  app.use("/api", router);
};
