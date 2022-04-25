import axios from 'axios';

//action type
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY';

//action creators
const _getOrderHistory = (orders) => {
	return {
		type: GET_ORDER_HISTORY,
		orders,
	};
};

//thunk creators
export const getOrderHistory = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data: orders } = await axios.get(`/api/users/orderHistory`, {
				headers: { authorization: token },
			});
			dispatch(_getOrderHistory(orders));
		} catch (err) {
			console.error("Unable to get user's order history: ", err);
		}
	};
};

//reducer
const orderHistory = (state = [], action) => {
	switch (action.type) {
		case GET_ORDER_HISTORY:
			return action.orders;
		default:
			return state;
	}
};

export default orderHistory;
