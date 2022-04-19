//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Order = require("./models/Order");
const Product = require("./models/Product");
const Review = require("./models/Review");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

// Product.belongsToMany(Order, { through: "ProductOrder" });
// Order.belongsToMany(Product, { through: "ProductOrder" });

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    Review,
  },
};
