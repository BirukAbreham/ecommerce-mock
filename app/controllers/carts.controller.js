const db = require("../models");
const Users = db.items;
const Carts = db.carts;
const CartItems = db.cartItems;
const Items = db.items;

const isIdUnique = (id) => {
  return Items.count({ where: { id: id } }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
};

// create user cart
exports.create = (req, res) => {
  // validate
  Users.findOne({
    where: {
      id: req.params.userid,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: "User does not exist",
        });
      }
      // handle if cart already exists
      Carts.findOne({
        where: {
          userId: user.id,
        },
      })
        .then((cart) => {
          if (!cart.updateHistory) {
            return res.status(400).send({
              error: "Cart already exists",
            });
          }

          // validate body
          if (!req.body.items.length) {
            res.status(400).send({
              error: "Cart items cannot be empty",
            });
            return;
          }

          // create cart
          const newCart = {
            updateHistory: false,
            userId: user.id,
          };

          // validate if items exist while creating cart with some quantity
          // all item check
          let allItemPresence = true;
          for (let item of req.body.items) {
            if (!isIdUnique(item.itemid)) {
              allItemPresence = false;
            }
          }

          if (!allItemPresence) {
            res.status(400).send({
              error: "Item in the cart does not exist",
            });
            return;
          }

          Carts.create(newCart)
            .then((newCart) => {
              for (let item of req.body.items) {
                CartItems.create({
                  cartId: newCart.id,
                  itemId: item.itemid,
                  quantity: item.quantity,
                });
              }

              Carts.findByPk(newCart.id)
                .then((data) => {
                  res.status(201).send(data);
                })
                .catch((err) => {
                  console.log(`Error on fetch cart data ${err}`);
                });
            })
            .catch((err) => {
              res.status(500).send({
                error: err.message || "Error occurred while creating cart",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            error: err.message || "Error occurred while creating cart",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Error occurred, while creating cart",
      });
    });
};

// get cart details
exports.findOne = (req, res) => {
  // validate if user exists
  Users.findOne({
    where: {
      id: req.params.userid,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          error: "User does not exist",
        });
      }

      Carts.findOne({
        where: {
          userId: user.id,
        },
      })
        .then((cart) => {
          Carts.findByPk(cart.id, { include: ["items"] })
            .then((cartIt) => {
              res.send(cartIt);
            })
            .catch((err) => {
              res.status(500).send({
                error:
                  err.message ||
                  "Error occurred, while fetching cart information",
              });
            });
        })
        .catch((err) => {
          res.status(500).send({
            error:
              err.message || "Error occurred, while fetching cart information",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Error occurred, while fetching cart information",
      });
    });
};

// update or remove items from cart
exports.update = (req, res) => {
  const userid = req.params.userid;
  const itemid = req.params.itemid;

  Carts.findOne({
    where: {
      userId: userid,
    },
  })
    .then((cart) => {
      if (!cart) {
        res.status(404).send({
          error: "User does not exist",
        });
        return;
      }

      Carts.update(
        { updateHistory: true },
        {
          where: { id: cart.id },
        }
      );

      CartItems.destroy({
        where: {
          cartId: cart.id,
          itemId: itemid,
        },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Item removed from cart successfully",
            });
            return;
          } else {
            res.status(400).send({
              error: `Could not remove item with id: ${itemid}`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            error: err.message || `Could not remove item with id: ${itemid}`,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || `Could not remove item with id: ${itemid}`,
      });
    });
};
