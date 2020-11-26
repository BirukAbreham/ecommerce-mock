const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      error: "Unauthorized access",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: "Unauthorized access",
      });
    }
    req.userId = decoded.userId;
    next();
  });
};
