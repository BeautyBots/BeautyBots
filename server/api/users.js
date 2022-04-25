const router = require('express').Router();
const {
	models: { User, Order },
} = require('../db');
module.exports = router;

//GET /api/users
router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ['id', 'username', 'email', 'userType'],
			order: [['username', 'ASC']],
		});
		res.json(users);
	} catch (err) {
		next(err);
	}
});

//GET /api/users/orderHistory
router.get('/orderHistory', async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(await user.getOrders());
	} catch (err) {
		next(err);
	}
});

//GET /api/users/:id
router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
			include: [Order],
			attributes: ['id','username', 'email', 'userType'],
		});
		res.send(user);
	} catch (err) {
		next(err);
	}
});

//ADMIN FEATURES
//PUT /api/users/updateUserType
router.put('/updateUserType', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.body.id },
		});
		user.userType = req.body.userType;
		await user.save();
		res.send(
			await User.findAll({
				attributes: ['id', 'username', 'email', 'userType'],
			})
		);
	} catch (err) {
		next(err);
	}
});

//DELETE /api/users/delete/:id
router.delete('/delete/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.id);
		await user.destroy();
		res.send(
			await User.findAll({
				attributes: ['id', 'username', 'email', 'userType'],
			})
		);
	} catch (err) {
		next(err);
	}
});
