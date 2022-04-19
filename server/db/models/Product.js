const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
		validate: {
			isDecimal: true,
		},
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	category: {
		type: Sequelize.STRING,
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue:
			'https://preview.redd.it/zcg4dt5ky1jy.jpg?auto=webp&s=d46d40fd9b63334f74987483cffa1ca7cf310e39',
	},
});

module.exports = Product;
