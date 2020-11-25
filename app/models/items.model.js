const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.TEXT,
    },
    vendorName: {
      type: Sequelize.STRING,
    },
  });

  return Items;
};
