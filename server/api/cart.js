const cartRouter = require("express").Router();
const {
  models: { Order, User },
} = require("../db");
module.exports = cartRouter;

cartRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (err) {
    next(err);
  }
});

cartRouter.post("/addToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (err) {
    next(err);
  }
});

cartRouter.post("/removeToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (err) {
    next(err);
  }
});
