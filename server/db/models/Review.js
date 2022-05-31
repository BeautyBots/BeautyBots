const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [30, 500],
    },
  },
});

module.exports = Review;
