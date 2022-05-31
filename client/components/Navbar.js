import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { _emptyCart } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
	<div className="nav-parent" fixed="top">
		<h2 className = "nav-brand moontime display-4">BeautyBots</h2>
		<nav>
			{isLoggedIn ? (
				<div className="nav-link">
					<Link to="/home">Home</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					{isAdmin && <Link to="/users">User List</Link>}
					{isAdmin && <Link to="/orders">All Orders</Link>}
					{isAdmin && <Link to="/products/addForm">Add Product</Link>}
					<Link to="/products">Products</Link>
					<Link to="/cart">Cart</Link>
					<Link to="/orderHistory">OrderHistory</Link>
				</div>
			) : (
				<div className="nav-link">
					<Link to="/home">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/products">Products</Link>
					<Link to="/cart">Cart</Link>
				</div>
			)}
		</nav>
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		isAdmin: state.auth.userType === 'Admin',
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
			dispatch(_emptyCart());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
