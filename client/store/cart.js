import axios from 'axios';

const GET_CART = 'GET_CART';
const EMPTY_CART = 'EMPTY_CART';

const _getCart = (cart) => {
	return {
		type: GET_CART,
		cart,
	};
};

export const _emptyCart = () => {
	return {
		type: EMPTY_CART,
	};
};

export const getCart = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			let cart;
			if (!token) {
				cart = JSON.parse(window.localStorage.getItem('cart'));
				console.log('getCart cart', cart);
			} else {
				const res = await axios.get(`/api/cart`, {
					headers: { authorization: token },
				});
				cart = res.data;
			}
			dispatch(_getCart(cart));
		} catch (error) {
			console.error('Unable to get cart: ', error);
		}
	};
};

export const addToCart = (product) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			let cart = window.localStorage.getItem('cart');
			if (!token) {
				if (!cart) {
					cart = {
						lineItems: [{ productId: product.id, quantity: 1, product }],
					};
					window.localStorage.setItem('cart', JSON.stringify(cart));
				} else {
					cart = JSON.parse(window.localStorage.getItem('cart'));
					const isFound = cart.lineItems.some(
						(item) => item.productId === product.id
					);
					if (isFound) {
						cart.lineItems = cart.lineItems.map((item) => {
							if (item.productId !== product.id) {
								return item;
							} else {
								return { ...item, quantity: Number(item.quantity) + 1 };
							}
						});
					} else {
						cart.lineItems.push({
							productId: product.id,
							quantity: 1,
							product,
						});
					}
					window.localStorage.setItem('cart', JSON.stringify(cart));
				}
			} else {
				const res = await axios.post('/api/cart/addToCart', product, {
					headers: { authorization: token },
				});
				cart = res.data;
			}
			dispatch(_getCart(cart));
		} catch (error) {
			console.log('Unable to add to cart:', error);
		}
	};
};

export const removeFromCart = (product) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			let cart = JSON.parse(window.localStorage.getItem('cart'));
			if (!token) {
				let idx = cart.lineItems.findIndex(
					(item) => item.productId === product.id
				);
				if (cart.lineItems[idx].quantity === 1) {
					cart.lineItems.splice(idx, 1);
				} else {
					cart.lineItems[idx] = {
						...cart.lineItems[idx],
						quantity: Number(cart.lineItems[idx].quantity) - 1,
					};
				}
				window.localStorage.setItem('cart', JSON.stringify(cart));
			} else {
				const res = await axios.post('/api/cart/removeToCart', product, {
					headers: { authorization: token },
				});
				cart = res.data;
			}
			dispatch(_getCart(cart));
		} catch (error) {
			console.log('Unable to remove from cart:', error);
		}
	};
};

const cartReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_CART:
			return action.cart;
		case EMPTY_CART:
			return {};
		default:
			return state;
	}
};

export default cartReducer;
