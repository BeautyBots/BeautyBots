import React from 'react';
import { connect } from 'react-redux';
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
		return (
			<tr onClick={this.handleClick}>
				<td>{singleOrder.id}</td>
				<td>{singleOrder.status}</td>
				{isClicked ? (
					<tr>
						{lineItems.map((lineItem) => (
							<td>
								<p>{lineItem.product.title}</p>
								<p>{lineItem.quantity}</p>
							</td>
						))}
					</tr>
				) : null}
			</tr>
		);
	}
}

export default SingleOrder;
