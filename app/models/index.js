const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.items = require("./items.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.carts = require("./carts.model.js")(sequelize, Sequelize);
db.cartItems = require("./cartItems.model.js")(sequelize, Sequelize);

// user cart association
db.users.hasOne(db.carts, { foreignKey: "userId", as: "carts" });
db.carts.belongsTo(db.users, { foreignKey: "userId", as: "user" });

// cart items association
db.carts.hasMany(db.cartItems, { as: "items" });
db.items.hasMany(db.cartItems, { as: "carts" });
db.cartItems.belongsTo(db.carts, { as: "cart", foreignKey: "cartId" });
db.cartItems.belongsTo(db.items, { as: "item", foreignKey: "itemId" });

module.exports = db;
