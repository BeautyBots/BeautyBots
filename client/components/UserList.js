import React from 'react';
import { connect } from 'react-redux';
import { updateUserType } from '../store/users';
import UserInfo from './UserInfo';

class UserList extends React.Component {
	constructor() {
		super();
	}

	render() {
		const { users, updateUserType } = this.props;

		return (
			<div id="users">
				<h2>USERS:</h2>
				<table>
					<tbody>
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Role</th>
						</tr>
						{users.map((user) => (
							<UserInfo
								user={user}
								key={user.id}
								updateUserType={updateUserType}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapState = ({ users }) => {
	return {
		users,
	};
};

// const mapDispatch = (dispatch) => {
// 	return {
// 		updateUserType: (user) => dispatch(updateUserType(user)),
// 	};
// };

export default connect(mapState, null)(UserList);
