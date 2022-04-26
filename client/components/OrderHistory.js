import React from 'react';
import { connect } from 'react-redux';
import { getOrderHistory } from '../store/orderHistory';
import { Accordion } from 'react-bootstrap';

class OrderHistory extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getOrderHistory();
	}

	render() {
		const orderHistory = this.props.orderHistory;
		if (!orderHistory.length) {
			return <div />;
		} else {
			return (
				// <Accordion>
				// 	{orderHistory.map((order) => {
				// 		return (
				// 			<Accordion.Item key={order.id} eventKey={`${order.id}`}>
				// 				<Accordion.Header>
				// 					<div>
				// 						<p>{`Order Id: ${order.id}`}</p>
				// 						<p>{`Status: ${order.status}`}</p>
				// 					</div>
				// 				</Accordion.Header>
				// 				<Accordion.Body>
				// 					{order.lineItems.map((item) => (
				// 						<div>
				// 							<img src={item.product.imageUrl} />
				// 							<p>{item.product.title}</p>
				// 							<p>{item.quantity}</p>
				// 						</div>
				// 					))}
				// 				</Accordion.Body>
				// 			</Accordion.Item>
				// 		);
				// 	})}
				// </Accordion>
				<div></div>
			);
		}
	}
}

const mapState = (state) => {
	return {
		orderHistory: state.orderHistory,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getOrderHistory: () => dispatch(getOrderHistory()),
	};
};

export default connect(mapState, mapDispatch)(OrderHistory);
