import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addToCart,
	getCart,
	removeFromCart,
	removeProduct,
} from '../store/cart';
import { createOrder } from '../store/order';

class Cart extends React.Component {
	constructor() {
		super();
		this.handleCheckout = this.handleCheckout.bind(this);
	}

	handleCheckout() {
		let cart = localStorage.getItem('cart');
		if (cart) {
			this.props.createOrder(cart);
			//do we need to set localstorage cart to empty
		} else {
			cart = this.props.cart;
			this.props.createOrder(cart);
		}
	}

	render() {
		const lineItems = this.props.cart.lineItems || [];
		if (lineItems.length === 0) {
			return <h1>Your cart is empty! buy something pls..</h1>;
		} else {
			return (
				<div>
					{lineItems.map((item) => (
						<div key={item.product.id}>
							<img src={`${item.product.imageUrl}`} />
							<p>{item.product.title}</p>
							<button onClick={() => this.props.removeFromCart(item.product)}>
								-
							</button>
							<span>{item.quantity}</span>
							<button onClick={() => this.props.addToCart(item.product)}>
								+
							</button>
							<button onClick={() => this.props.removeProduct(item.product)}>
								Remove
							</button>
							<p>{item.product.price}</p>
						</div>
					))}
					<Link to="/checkout" onClick={this.handleCheckout}>
						Checkout
					</Link>
				</div>
			);
		}
	}
}

const mapState = ({ cart }) => {
	return { cart }; //object
};

const mapDispatch = (dispatch) => {
	return {
		getCart: () => dispatch(getCart()),
		addToCart: (product) => dispatch(addToCart(product)),
		removeFromCart: (product) => dispatch(removeFromCart(product)),
		removeProduct: (product) => dispatch(removeProduct(product)),
		createOrder: (cart) => dispatch(createOrder(cart)),
	};
};

export default connect(mapState, mapDispatch)(Cart);
