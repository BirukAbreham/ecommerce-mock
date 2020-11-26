const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

let corsOptions = {
  origin: "http://localhost:5001",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Simple Enlisting Express REST API with Swagger",
      version: "1.0.0",
      description: "This is a simple Restful API for ecommerce-mock project",
      // license: {
      //   name: "MIT",
      //   url: "https://spdx.org/licenses/MIT.html",
      // },
      contact: {
        name: "Biruk Abreham",
        url: "https://github.com/BirukAbreham",
        email: "biruk_abraham@yahoo.com",
      },
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-access-token",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["./app/routes/routes.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
