module.exports = (sequelize, Sequelize) => {
  const CartItems = sequelize.define("cartItems", {
    quantity: {
      type: Sequelize.INTEGER,
      alllowNull: false,
    },
  });

  return CartItems;
};
