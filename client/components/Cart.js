import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
	constructor() {
		super();
	}

	render() {
		const products = JSON.parse(localStorage.getItem('products'));
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

export default Cart;
