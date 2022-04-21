import axios from 'axios';

const GET_CART = 'GET_CART';

const _getCart = (cart) => {
	return {
		type: GET_CART,
		cart,
	};
};

export const getCart = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data: cart } = await axios.get(`/api/cart`, {
				headers: { authorization: token },
			});
			dispatch(_getCart(cart));
		} catch (error) {
			console.error('Unable to get cart: ', error);
		}
	};
};

const cartReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_CART:
			return action.cart;
		default:
			return state;
	}
};

export default cartReducer;
