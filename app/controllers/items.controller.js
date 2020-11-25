const db = require("../models");
const uploadFile = require("../middleware/upload");
const Items = db.items;
// const Op = db.Sequelize.Op;

// Create
exports.create = async (req, res) => {
  console.log("request body", req.params);
  // validate
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.description ||
    !req.body.vendorName
  ) {
    res.status(400).send({
      error: "Content cannot be empty!",
    });
    return;
  }
  try {
    await uploadFile(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ error: "Please, upload item photo" });
    }

    // Create an item
    const item = {
      name: req.body.name,
      photo: __basedir + "/resource/uploads/" + req.file.originalname,
      price: req.body.price,
      description: req.body.description,
      vendorName: req.body.vendorName,
    };

    // save item to db
    Items.create(item)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          error: err.message || "Error occurred while creating item.",
        });
      });
  } catch (err) {
    res.status(500).send({
      error: `Could not upload item photo ${err}`,
    });
  }
};

// Get all
exports.findAll = (req, res) => {};

// Get a single item
exports.findOne = (req, res) => {};

// Update an item
exports.update = (req, res) => {};

// Delete an item
exports.delete = (req, res) => {};
