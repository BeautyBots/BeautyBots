const orderRouter = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { Order, User },
} = require("../db");
module.exports = orderRouter;

//Admin get ALL Orders where status is Pending or Shipped
orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        [Op.or]: [
          {status: "Pending"},
          {status: "Shipped"}
        ]
      },
      include: [User]
    })
    res.send(orders);
  } catch (error) {
    next(error);
  }
})
