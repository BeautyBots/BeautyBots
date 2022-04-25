'use strict';

const { faker } = require('@faker-js/faker');

const {
	db,
	models: { User, Order, Product, Review, LineItem },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users
	const users = [
		{ username: 'cody', email: 'cody@gmail.com', password: '123' },
		{
			username: 'murphy',
			email: 'murphy@gmail.com',
			password: '123',
		},
		{
			username: 'beautybot',
			email: 'beautybot@gmail.com',
			password: '123',
			userType: 'Admin',
		},
	];
	await Promise.all(users.map((user) => User.create(user)));

	//Creating Products
	const products = [
		{
			title: "Paula's Choice Skin Balancing Pore-Reducing Toner",
			price: 22.0,
			description:
				'Contains antioxidants and hydrating ceramides, making oily areas less noticeable and skin more even. This toner is specially formulated for use with oily skin, combination skin, enlarged pores, blemish-prone skin to balance, refine, and protect your skin.',
			quantity: 20,
			category: 'Toner',
			imageUrl: '/productImages/PaulasC.png',
		},
		{
			title: 'Murad Environmental Shield Essential-C Cleanser',
			price: 12.0,
			description:
				'A gentle daily cleanser for pigmented, sun damaged and environmentally aged skin.',
			quantity: 20,
			category: 'Cleanser',
			imageUrl: '/productImages/murad_cleanser.png',
		},
		{
			title: 'New York Biology Dead Sea Mud Mask',
			price: 16.0,
			description:
				'PURE DEAD SEA MUD helps cleanse the skin and provide a soothing sensation. Rich in minerals, it aids skin renewal, creating a gentle exfoliation effect that removes excess oil, toxins, and dead skin cells for a softer feel and radiant glow.',
			quantity: 20,
			category: 'Mask',
			imageUrl: '/productImages/sea_mud_mask.png',
		},
		{
			title: 'La Roche-Posay Effaclar Mat Oil-Free Mattifying Moisturizer',
			price: 32.0,
			description:
				'Use as a daily, oil-free mattifying moisturizer for oily skin after cleansing. It is an excellent base for makeup.',
			quantity: 20,
			category: 'Moisturizer',
			imageUrl: '/productImages/laroche-posay_moisturizer.png',
		},
		{
			title: 'SHVYOG Vitamin C Clay Face Mask',
			price: 14.0,
			description:
				'The main ingredients vitamin C and turmeric has stronger effects of removing dullness and anti-inflammatory. Vitamin C helps prevent pigmentation, which is effective in preventing sunburn, the clay face mask is mixed with organic turmeric, that helps to improve the dullness of the skin, so that your skin is still soft and radiant.',
			quantity: 20,
			category: 'Mask',
			imageUrl: '/productImages/shvyog_face_mask.png',
		},
		{
			title: 'PanOxyl Acne Foaming Wash',
			price: 10.0,
			description:
				'Maximum strength, antimicrobial foaming wash kills acne-causing bacteria on contact and lifts dirt from pores for a fresher, clearer you.',
			quantity: 20,
			category: 'Cleanser',
			imageUrl: '/productImages/panoxyl_foamwash.png',
		},
		{
			title: 'Youth To The People Kale + Green Tea Superfood Face Cleanser',
			price: 36.0,
			description:
				'Clean, 100% vegan formula. Proprietary cold-pressed plant extracts harnesses powerful antioxidants & phytonutrients from pure, effective ingredients.',
			quantity: 20,
			category: 'Cleanser',
			imageUrl: '/productImages/youthtothepeople_face_cleanser.png',
		},
	];
	await Promise.all(products.map((product) => Product.create(product)));

	//Creating Reviews
	function reviewsDB() {
		let reviews = [];
		for (let i = 0; i < 20; i++) {
			reviews.push({
				body: `I love the ${faker.commerce.product()}! I would ${Math.ceil(
					100 * Math.random()
				)}% recommend this item to other customers.`,
				productId: Math.ceil(7 * Math.random()),
				userId: Math.ceil(3 * Math.random()),
			});
		}
		return reviews;
	}
	await Promise.all(reviewsDB().map((review) => Review.create(review)));

	//Creating Orders
	function ordersDB() {
		let orders = [
			{ userId: 1, status: 'Cart' },
			{ userId: 2, status: 'Cart' },
			{ userId: 3, status: 'Cart' },
		];
		for (let i = 0; i < 5; i++) {
			orders.push({
				userId: Math.ceil(3 * Math.random()),
				status: 'Pending',
			});
		}
		for (let i = 0; i < 5; i++) {
			orders.push({
				userId: Math.ceil(3 * Math.random()),
				status: 'Shipped',
			});
		}
		return orders;
	}
	await Promise.all(ordersDB().map((order) => Order.create(order)));

	//Creating LineItems
	function lineItemsDB() {
		let lineItems = [];
		for (let i = 0; i < 6; i++) {
			lineItems.push({
				quantity: Math.ceil(3 * Math.random()),
				productId: i + 1,
				orderId: Math.ceil(3 * Math.random()),
			});
		}
		for (let i = 0; i < 15; i++) {
			lineItems.push({
				quantity: Math.ceil(3 * Math.random()),
				productId: Math.ceil(7 * Math.random()),
				orderId: Math.ceil(5 * Math.random()) + 3,
			});
		}
		return lineItems;
	}
	await Promise.all(lineItemsDB().map((item) => LineItem.create(item)));

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
	return {
		users: {
			cody: users[0],
			murphy: users[1],
		},
	};
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
