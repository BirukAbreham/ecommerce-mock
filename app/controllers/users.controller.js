const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const db = require("../models");
const Users = db.users;

// SignUp
exports.signup = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      error: "User information cannot be empty",
    });
  }

  // check if duplicate username
  Users.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        error: "Username is already exists",
      });
      return;
    }
  });

  // Create a user
  Users.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.status(201).send({
        message: `User registered successfully, with username ${user.username}`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "User could not be registered, error occurred",
      });
    });
};

// SignIn
exports.singin = (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User does not exist",
        });
      }

      let passwordValidation = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordValidation) {
        return res.status(401).send({
          accessToken: null,
          message: "Authentication error",
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        // id: user.id,
        username: user.username,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "User could not sign in, error occurred",
      });
    });
};
