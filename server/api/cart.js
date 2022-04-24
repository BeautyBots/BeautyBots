const cartRouter = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = cartRouter;

//GET /api/cart
cartRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (err) {
    next(err);
  }
});

//POST /api/cart/createOrder
cartRouter.post("/createOrder", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (error) {
    next(error);
  }
});

//POST /api/cart/addToCart
cartRouter.post("/addToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (err) {
    next(err);
  }
});

//POST /api/cart/removeFromCart
cartRouter.post("/removeFromCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (err) {
    next(err);
  }
});
