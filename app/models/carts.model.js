module.exports = (sequelize, Sequelize) => {
  const Carts = sequelize.define("carts", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Carts;
};
