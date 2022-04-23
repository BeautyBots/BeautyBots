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

//GET /api/users/:id
router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				id: req.params.id,
			},
			include: [Order],
			attributes: ['username', 'email', 'userType'],
		});
		res.send(user);
	} catch (err) {
		next(err);
	}
});

//Admin Priviledge to add other admins
//PUT /api/users/admin/updateUser/
router.put('/admin/updateUser/', async (req, res, next) => {
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

//DELETE /api/users/admin/delete/:id
router.delete('/admin/delete/:id', async (req, res, next) => {
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
