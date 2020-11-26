const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verfiyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      error: "Access token is mandatory",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: "Unauthorized access",
      });
      req.userId = decoded.userId;
      next();
    }
  });
};

const authJwt = {
  verfiyToken: verfiyToken,
};

module.exports = authJwt;
