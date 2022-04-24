const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Order = require("./Order");
const Product = require("./Product");
const Review = require("./Review");
const LineItem = require("./LineItem");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  userType: {
    type: Sequelize.ENUM("User", "Admin"),
    defaultValue: "User",
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

User.prototype.getCart = async function () {
  const where = {
    userId: this.id,
    status: "Cart",
  };
  let cart = await Order.findOne({
    where,
  });
  ``;
  if (!cart) {
    cart = await Order.create(where);
  }
  return Order.findByPk(cart.id, {
    include: [{ model: LineItem, include: [Product] }],
  });
};

User.prototype.addToCart = async function (product) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find(
    (lineItem) => lineItem.productId === product.id
  );
  if (lineItem) {
    lineItem.quantity++;
    await lineItem.save();
  } else {
    await LineItem.create({
      productId: product.id,
      orderId: cart.id,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function (product) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find(
    (lineItem) => lineItem.productId === product.id
  );
  lineItem.quantity--;
  if (lineItem.quantity) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.status = "Order";
  await cart.save();
  return this.getCart();
};
/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
