import axios from 'axios';

const GET_USERS = 'GET_USERS';

const _getUsers = (users) => {
	return {
		type: GET_USERS,
		users,
	};
};

export const getUsers = () => {
	return async (dispatch) => {
		try {
			const { data: users } = await axios.get('/api/users');
			dispatch(_getUsers(users));
		} catch (error) {
			console.error('Unable to get users:', error);
		}
	};
};

export const updateUserType = (user) => {
	return async (dispatch) => {
		try {
			const { data: users } = await axios.put(
				`/api/users/admin/updateUser/`,
				user
			);
			dispatch(_getUsers(users));
		} catch (error) {
			console.log('Unable to update userType: ', error);
		}
	};
};

export const deleteUser = (user) => {
	return async (dispatch) => {
		try {
			const { data: users } = await axios.delete(
				`/api/users/admin/delete/${user.id}`
			);
			dispatch(_getUsers(users));
		} catch (error) {
			console.log('Unable to update userType: ', error);
		}
	};
};

const usersReducer = (state = [], action) => {
	switch (action.type) {
		case GET_USERS:
			return action.users;
		default:
			return state;
	}
};

export default usersReducer;
