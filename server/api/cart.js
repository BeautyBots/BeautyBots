const cartRouter = require('express').Router();
const {
	models: { Order, User },
} = require('../db');
module.exports = cartRouter;

cartRouter.get('/', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		const cart = await Order.findOne({
			where: {
				userId: user.id,
				status: 'Cart',
			},
		});
		res.send(cart);
	} catch (err) {
		next(err);
	}
});
