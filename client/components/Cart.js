import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addToCart,
	getCart,
	removeFromCart,
	removeProduct,
} from '../store/cart';

class Cart extends React.Component {
	constructor() {
		super();
	}

	render() {

		const lineItems = this.props.cart.lineItems || [];
		if (lineItems.length === 0) {
			return (
				<div>
					<img src="/productImages/shopping_cart.png" />
					<h1>Your Cart is Empty</h1>
					<Link to="/products">Continue Shopping</Link>
				</div>
			)
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
					<Link to="/checkout" >
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
	};
};

export default connect(mapState, mapDispatch)(Cart);
