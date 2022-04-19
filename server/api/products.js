const productRouter = require('express').Router();
const {
	models: { Product },
} = require('../db');

//GET /api/products
productRouter.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.send(products);
	} catch (err) {
		console.log('err: ', err);
		next(err);
	}
});

//GET /api/products/:id
productRouter.get('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		res.send(product);
	} catch (err) {
		console.log('err: ', err);
		next(err);
	}
});

module.exports = productRouter;
