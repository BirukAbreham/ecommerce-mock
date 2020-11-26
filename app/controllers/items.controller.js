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

// To get limit and offset
const getPagination = (page, size) => {
  const limit = size ? size : 4;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

// Desired structure { 'totalItems': <num>, 'items': [...], 'totalPages': <num>, 'currentPage': <num> }
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

// Get all
exports.findAll = (req, res) => {
  let sort = req.query.sort || null; // desc or asc
  if (sort !== "desc" || sort !== "asc") sort = null;
  const page = Number(req.query.page);
  const size = Number(req.query.size);

  const { limit, offset } = getPagination(page, size);

  if (sort) {
    Items.findAndCountAll(
      {
        order: [["price", sort.toUpperCase()]],
        offset: offset,
        limit: limit,
      },
      { override: true }
    )
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send({
          error: err.message || "Error occurred while retrieving items",
        });
      });
  } else {
    Items.findAndCountAll(
      {
        offset: offset,
        limit: limit,
      },
      { override: true }
    )
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.send(response);
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
        res.status(400).send({
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
        res.status(400).send({
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
