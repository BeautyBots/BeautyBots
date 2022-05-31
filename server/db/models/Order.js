const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	status: {
		type: Sequelize.ENUM('Cart', 'Pending', 'Shipped'),
		defaultValue: 'Cart',
	},
	email: {
		type: Sequelize.STRING,
	},
});

module.exports = Order;
