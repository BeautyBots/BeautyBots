import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';

import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import Cart from './components/Cart';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn, userType } = this.props;
		return (
			<div>
				<div>
					{isLoggedIn && userType === 'Admin' ? (
						<Switch>
							<Route path="/home" component={Home} />
							<Route exact path="/products" component={AllProducts} />
							<Route
								exact
								path="/products/addForm"
								component={AddProductForm}
							/>
							<Route
								exact
								path="/products/:productId"
								component={SingleProduct}
							/>
							<Route
								exact
								path="/products/:productId/editForm"
								component={EditProductForm}
							/>
						</Switch>
					) : isLoggedIn ? (
						<Switch>
							<Route path="/home" component={Home} />
							<Route exact path="/products" component={AllProducts} />
							<Route path="/products/:productId" component={SingleProduct} />
							<Route path="/cart" component={Cart} />
						</Switch>
					) : (
						<Switch>
							<Route path="/" exact component={Login} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Signup} />
							<Route exact path="/products" component={AllProducts} />
							<Route path="/products/:productId" component={SingleProduct} />
							<Route path="/cart" component={Cart} />
						</Switch>
					)}
				</div>

				<div>
					{/* <Switch>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/addForm" component={AddProductForm} />
            <Route exact path="/products/:productId/editForm" component={EditProductForm} />
            <Route path="/products/:productId" component={SingleProduct} />
          </Switch> */}
				</div>
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
		userType: state.auth.userType,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
