const productRouter = require('express').Router();
const {
	models: { Product, Review },
} = require('../db');

//****NOTE TO TEAMMATES: do we need to include any other models when we fetch product data? ie. const products = await Campus.findAll({include: Review})

//USER FEATURES
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
		const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [Review]
    });
		res.send(product);
	} catch (err) {
		console.log('err: ', err);
		next(err);
	}
});

//ADMIN FEATURES
//PUT /api/products/:id
productRouter.put('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(Number(req.params.id));
		await product.update(req.body);
		res.send(product);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//DELETE /api/products/:id
productRouter.delete('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		await product.destroy();
		res.send(product);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

//POST /api/products
productRouter.post('/', async (req, res, next) => {
	try {
		const product = await Product.create(req.body);
		res.send(product);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

module.exports = productRouter;
