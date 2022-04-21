const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	total: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
	},
	products: {
		type: Sequelize.ARRAY(Sequelize.JSON),
		allowNull: false,
	},
	status: {
		type: Sequelize.ENUM('Cart', 'Order'),
		defaultValue: 'Cart',
	},
});

module.exports = Order;
