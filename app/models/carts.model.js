module.exports = (sequelize, Sequelize) => {
  const Carts = sequelize.define("carts", {
    updateHistory: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return Carts;
};
