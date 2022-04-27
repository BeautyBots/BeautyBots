import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import { getCart } from './store/cart';
import { getUsers } from './store/users';
import { getAdminOrders } from './store/adminOrders';
import { getProducts } from './store/products';

import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import Cart from './components/Cart';
import UserList from './components/UserList';
import Review from './components/Review';
import AdminOrders from './components/AdminOrders';
import OrderHistory from './components/OrderHistory';
import StripePaymentForm from './components/StripePaymentForm';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
		this.props.loadProducts()
		this.props.getUsers();
		this.props.getCart();
		this.props.getOrders();
	}

	componentDidUpdate(prevProps) {

		if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
			this.props.getCart();
		}

	}


	render() {
		const { isLoggedIn, isAdmin } = this.props;
		return (
			<div>
				{isLoggedIn ? (
					<Switch>
						<Route path="/home" component={Home} />
						<Route exact path="/products" component={AllProducts} />
						{isAdmin && (
							<Route
								exact
								path="/products/addForm"
								component={AddProductForm}
							/>
						)}
						{isAdmin && (
							<Route
								path="/products/:productId/editForm"
								component={EditProductForm}
							/>
						)}
						{isAdmin && <Route exact path="/orders" component={AdminOrders} />}
						<Route
							exact
							path="/products/:productId"
							component={SingleProduct}
						/>
						<Route path="/cart" component={Cart} />
						{isAdmin && <Route path="/users" component={UserList} />}
						<Route path="/products/:productId/addreview" component={Review} />
						<Route path="/orderHistory" component={OrderHistory} />
						<Route path="/checkout" component={StripePaymentForm} />
					</Switch>
				) : (
					<Switch>
						<Route path="/home" component={Home} />
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route exact path="/products" component={AllProducts} />
						<Route
							exact
							path="/products/:productId"
							component={SingleProduct}
						/>
						<Route path="/cart" component={Cart} />
						<Route path="/products/:productId/addreview" component={Login} />
						<Route path="/checkout" component={StripePaymentForm} />
					</Switch>
				)}
			</div>
		);
	}
}
/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
		isAdmin: state.auth.userType === 'Admin',
		cart: state.cart,
		orders: state.order,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData: () => dispatch(me()),
		loadProducts: () => dispatch(getProducts()),
		getCart: () => dispatch(getCart()),
		getUsers: () => dispatch(getUsers()),
		getOrders: () => dispatch(getAdminOrders()),
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
