import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderHistory } from '../store/orderHistory';

class SingleOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isClicked: false };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		//toggle if the order is clicked
		this.setState({ isClicked: !this.state.isClicked });
	}

	render() {
		const singleOrder = this.props.order;
		const isClicked = this.state.isClicked;
		const lineItems = singleOrder.lineItems;
		const date = singleOrder.createdAt.substr(0, 10);
		return (
			<div className="order" onClick={this.handleClick}>
				<div className="order-info">
					<div className="attribute">
						<p>{singleOrder.id}</p>
					</div>
					<div className="attribute">
						<p>{date}</p>
					</div>
					<div className="attribute">
						<p>{singleOrder.status}</p>
					</div>
				</div>
				{isClicked ? (
					<div className="products">
						{lineItems.map((lineItem) => (
							<div key={lineItems.id} className="product">
								<img src={lineItem.product.imageUrl} />
								<div className="product-info">
									<Link to={`/products/${lineItem.product.id}`}>
										{lineItem.product.title}{' '}
									</Link>
									<p>{`Quantity: ${lineItem.quantity}`}</p>
									<p>{`Price: $${lineItem.product.price}`}</p>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
		);
	}
}

export default SingleOrder;
