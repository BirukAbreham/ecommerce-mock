module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define("items", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // photo: {
    //   type: Sequelize.STRING,
    // },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    vendorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Items;
};
