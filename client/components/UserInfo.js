import React from 'react';
import { connect } from 'react-redux';
import { deleteUser, updateUserType } from '../store/users';

class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.user.id,
			username: this.props.user.username,
			email: this.props.user.email,
			userType: this.props.user.userType,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(evt) {
		this.setState({ userType: evt.target.value });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateUserType({
			id: this.state.id,
			userType: this.state.userType,
		});
	}

	render() {
		const { id, username, email, userType } = this.state;

		return (
			<tr>
				<td>{username}</td>
				<td>{email}</td>
				<td>
					<form onSubmit={this.handleSubmit}>
						<select value={userType} onChange={this.handleChange}>
							<option value="Admin">Admin</option>
							<option value="User">User</option>
						</select>
						<button type="submit">save</button>
					</form>
				</td>
				<td>
					<button type="submit" onClick={() => this.props.deleteUser({ id })}>
						X
					</button>
				</td>
			</tr>
		);
	}
}

const mapDispatch = (dispatch) => ({
	deleteUser: (user) => dispatch(deleteUser(user)),
	updateUserType: (user) => dispatch(updateUserType(user)),
});

export default connect(null, mapDispatch)(UserInfo);
