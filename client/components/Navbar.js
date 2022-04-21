import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, userType }) => (
	<div>
		<h1>BeautyBots</h1>
		<nav>
			{isLoggedIn && userType === 'Admin' ? (
				<div>
					{/* these links after you log in as admin */}
					<Link to="/home">Home</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					<Link to="/products/addForm">Add Product</Link>
					<Link to="/products">Products</Link>
				</div>
			) : isLoggedIn ? (
				<div>
					{/* these links after you log in as user */}
					<Link to="/home">Home</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					<Link to="/products">Products</Link>
					<Link to="/cart">Cart</Link>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/products">Products</Link>
					<Link to="/cart">Cart</Link>
				</div>
			)}
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		userType: state.auth.userType,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
