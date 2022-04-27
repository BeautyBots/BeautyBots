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
			title: 'FORMULA 10.0.6 Seriously Shine-Free Moisturizer',
			price: 6.0,
			description: 'Aloe vera softens while bamboo extract absorbs excess oil.',
			quantity: 20,
			category: 'Moisturizer',
			imageUrl: '/productImages/Formula1006.png',
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
		{
			title: 'Neutrogena Liquid Fragrance-Free Gentle Facial Cleanser',
			price: 8.0,
			description:
				"Hypoallergenic cleanser is dermatologist proven to be mild and its unique formula is also oil-free and non-comedogenic so it won't clog pores. It makes the perfect addition to your daily beauty and skincare routine for an at-home self-care experience.",
			quantity: 20,
			category: 'Cleanser',
			imageUrl: '/productImages/LiquidNeutragena.png',
		},
		{
			title: 'Pacifica Beauty Sea Foam Face Cleanser',
			price: 10.0,
			description:
				'A 100% Vegan & Cruelty-free formula suitable for all skin type. Formulated without parabens, phthalates, SLS, or mineral oil.',
			quantity: 20,
			category: 'Cleanser',
			imageUrl: '/productImages/PacificSeaFoam.png',
		},
		{
			title: 'THAYERS Alcohol-Free Rose Petal Witch Hazel Facial Toner',
			price: 11.0,
			description:
				'Alcohol-free and formulated to soothe, tone, hydrate, and balance the pH level of skin.',
			quantity: 20,
			category: 'Toner',
			imageUrl: '/productImages/ThayersWitchHazel.png',
		},
		{
			title: 'PYUNKANG YUL Facial Essence Toner',
			price: 12.0,
			description: `Pyunkang Yul Eastern Medicine Clinic, specialized in treating skin and respiratory
        diseases for about 50 years, the toner helps to calm angry skin comfortably by carefully selected ingredients found in nature and rigorous testing.`,
			quantity: 20,
			category: 'Toner',
			imageUrl: '/productImages/PyunkangToner.png',
		},
		{
			title: 'Bliss Glow Boosting Multivitamin Toner',
			price: 10.0,
			description: `FRAGRANCE FREE & FREE OF HARSH CHEMICALS including parabens, phthalates, SLS, SLES and other bad stuff you don't want on your skin or body, as well as PETA-certified and cruelty-free`,
			quantity: 20,
			category: 'Toner',
			imageUrl: '/productImages/BlissToner.png',
		},
		{
			title: 'Glow Recipe Watermelon Glow BHA + PHA Pore-Tight Facial Toner',
			price: 34.0,
			description: `Hydrating Watermelon Extract - Hydrates, delivers essential vitamins and amino acids, and helps to soothe skin. This hydrating ingredient in this facial toner also helps with fine lines and dark spots.`,
			quantity: 20,
			category: 'Toner',
			imageUrl: '/productImages/GlowWatermelonToner.png',
		},
		{
			title: 'Neutrogena Triple Age Repair Moisturizer with SPF 25',
			price: 16.0,
			description: `Our anti-aging daily moisturizer is clinically proven to help smooth the look of wrinkles, even skin tone, and visibly firm skin for a difference you can see in just as little as 4 weeks, revealing smoother and younger-looking skin`,
			quantity: 20,
			category: 'Moisturizer',
			imageUrl: '/productImages/NeutrogenaTripleAgeRepair.png',
		},
		{
			title: 'Tatcha The Dewy Skin Cream',
			price: 70.0,
			description: `A RICH CREAM that feeds skin with plumping hydration and antioxidant-packed Japanese purple rice for a dewy, healthy glow. Ideal for dry skin, but can be used on combo skin for those who prefer a richer texture.`,
			quantity: 20,
			category: 'Moisturizer',
			imageUrl: '/productImages/TachaMoisturizer.png',
		},
		{
			title: 'FaceTory Best of Seven Facial Masks Collection',
			price: 14.0,
			description: `ALL SKIN TYPES- each mask focuses on a different skin concern to help boost radiance and support the skin. Contains 7 different sheet masks that add hydration and balance skin.`,
			quantity: 20,
			category: 'Mask',
			imageUrl: '/productImages/BestOfSevenSheetMask.png',
		},
		{
			title:
				'FaceTory Moon Velvet Moisturizing Cream with Jojoba Oil Sheet Mask',
			price: 12.0,
			description: `JOJOBA SEED OIL to balance and control sebum production, calm acne, and soothe dry skin. Jojoba seed oil is known to be a great balancing ingredient for all skin types, even oily skin. It balances the skin's natural oils to ensure softness and clarity. With the great balancing properies of jojoba oil, skin feels more comfortable and soothed and not overly oily or over-moisturized`,
			quantity: 20,
			category: 'Mask',
			imageUrl: '/productImages/MoonVelvet.png',
		},
		{
			title: 'Glow Baby Glow 2-Step Radiance Boosting Sheet Mask ',
			price: 14.0,
			description: `ALOE BARBADENSIS EXTRACT to fight inflammation, acne, fine lines, and boost collagen production. Aloe is a soothing ingredient that helps alleviate redness and skin irritation. It's a great ingredient to use after being out in the sun!`,
			quantity: 20,
			category: 'Mask',
			imageUrl: '/productImages/GlowBabyGlow.png',
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
		for (let i = 0; i < 10; i++) {
			lineItems.push({
				quantity: Math.ceil(3 * Math.random()),
				productId: i + 1,
				orderId: Math.ceil(3 * Math.random()),
			});
		}
		for (let i = 0; i < 18; i++) {
			lineItems.push({
				quantity: Math.ceil(3 * Math.random()),
				productId: i + 1,
				orderId: Math.ceil(10 * Math.random()) + 3,
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
