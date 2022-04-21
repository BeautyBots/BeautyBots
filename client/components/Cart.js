import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../store/cart';

class Cart extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		this.props.getCart();
	}

	render() {
		// const products = JSON.parse(localStorage.getItem('products'));
		const products = this.props.cart.products;
		if (!products) {
			return <h1>Your cart is empty! buy something pls..</h1>;
		} else {
			return (
				<div>
					{products.map((product) => (
						<div key={product.id}>
							<img src={`${product.imageUrl}`} />
							<p>{product.title}</p>
							<p>{product.quantity}</p>
							<p>{product.price}</p>
						</div>
					))}
					<button>Checkout</button>
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
	};
};

export default connect(mapState, mapDispatch)(Cart);
