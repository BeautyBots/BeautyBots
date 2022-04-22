const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("Cart", "Order"),
    defaultValue: "Cart",
  },
  email: {
    type: Sequelize.STRING,
  }
});

module.exports = Order;
