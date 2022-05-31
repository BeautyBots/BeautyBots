import axios from 'axios';

//ACTION TYPES
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//ACTION CREATORS
const _getOneProduct = (product) => {
	return {
		type: GET_ONE_PRODUCT,
		product,
	};
};

const _updateProduct = (updated) => {
	return {
		type: UPDATE_PRODUCT,
		updated,
	};
};

//THUNK CREATORS
export const getOneProduct = (productId) => {
	return async (dispatch) => {
		try {
			const { data: product } = await axios.get(`/api/products/${productId}`);
			dispatch(_getOneProduct(product));
		} catch (error) {
			console.error('Unable to get one product:', error);
		}
	};
};

export const updateProduct = (product) => {
	return async (dispatch) => {
		try {
			const { data: updated } = await axios.put(
				`/api/products/${product.id}`,
				product
			);
			dispatch(_updateProduct(updated));
		} catch (error) {
			console.error('Unable to update product:', error);
		}
	};
};

//REDUCER
const singleProductReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ONE_PRODUCT:
			return action.product;
		case UPDATE_PRODUCT:
			return action.updated;
		default:
			return state;
	}
};

export default singleProductReducer;
