<<<<<<< HEAD
import React from 'react';
import { connect } from 'react-redux';
import { getOrderHistory } from '../store/orderHistory';
import { getCart } from '../store/cart';
import { Accordion } from 'react-bootstrap';
import SingleOrder from './SingleOrder';
=======
import React from "react";
import { connect } from "react-redux";
import { getOrderHistory } from "../store/orderHistory";
import { getCart } from "../store/cart";
import Accordion from "react-bootstrap/Accordion";
>>>>>>> 55fc3cbaf25801982306bff95c884aed59be4f1f

class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOrderHistory();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.orderHistory.length !== this.props.orderHistory.length) {
      this.props.getOrderHistory();
    }
  }

	render() {
		const orderHistory = this.props.orderHistory;
		if (!orderHistory.length) {
			return (
				<div className="order-history">
					<div className="title">Your Order History</div>
					<div className="orders-header">
						<div className="attribute">
							<p>Order Id</p>
						</div>
						<div className="attribute">
							<p>Date Purchased</p>
						</div>
						<div className="attribute">
							<p>Status</p>
						</div>
					</div>
					<div className="no-order">
						<p>You have no order history.</p>
					</div>
				</div>
			);
		} else {
			return (
				// <Accordion flush>
				// 	{orderHistory.map((order, idx) => {
				// 		return (
				// 			<Accordion.Item key={order.id} eventKey={idx}>
				// 				<Accordion.Header>
				// 					<div>
				// 						<span>{`Order Id: ${order.id}`}</span>
				// 						<span>{`Status: ${order.status}`}</span>
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

				<div className="order-history">
					<div className="title">Your Order History</div>
					<div className="orders-header">
						<div className="attribute">
							<p>Order Id</p>
						</div>
						<div className="attribute">
							<p>Date Purchased</p>
						</div>
						<div className="attribute">
							<p>Status</p>
						</div>
					</div>
					{orderHistory.map((order, idx) => (
						<SingleOrder key={idx} order={order} />
					))}
				</div>
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
