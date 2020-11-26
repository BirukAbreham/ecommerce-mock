const db = require("../models");
// const uploadFile = require("../middleware/upload");
const Items = db.items;
// const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  // console.log("request body", req.params);
  // validate
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.description ||
    !req.body.vendorName
  ) {
    res.status(400).send({
      error: "Content cannot be empty",
    });
    return;
  }
  // try {
  //   await uploadFile(req, res);

  //   if (req.file === undefined) {
  //     return res.status(400).send({ error: "Please, upload item photo" });
  //   }

  // Create an item
  const item = {
    name: req.body.name,
    // photo: __basedir + "/resource/uploads/" + req.file.originalname,
    price: req.body.price,
    description: req.body.description,
    vendorName: req.body.vendorName,
  };

  // save item to db
  Items.create(item)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Error occurred while creating item.",
      });
    });
  // } catch (err) {
  //   res.status(500).send({
  //     error: `Could not upload item photo ${err}`,
  //   });
  // }
};

// Get all
// TODO: pagination
exports.findAll = (req, res) => {
  const sort = req.query.sort || null; // desc or asc

  if (sort) {
    Items.findAll({ order: [["price", sort]] })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          error: err.message || "Error occurred while retrieving items",
        });
      });
  } else {
    Items.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          error: err.message || "Error occurred while retrieving items",
        });
      });
  }
};

// Get a single item
exports.findOne = (req, res) => {
  const id = req.params.id;

  Items.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || `Error retriving an item`,
      });
    });
};

// Update an item
exports.update = (req, res) => {
  const id = req.params.id;

  Items.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item successfully updated",
        });
      } else {
        res.send({
          error: `Cannot update item with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || `Error updating item with id=${id}`,
      });
    });
};

// Delete an item
exports.delete = (req, res) => {
  const id = req.params.id;

  Items.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Item successfully deleted",
        });
      } else {
        res.send({
          error: `Cannot delete item with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || `Could not delete item with id: ${id}`,
      });
    });
};
