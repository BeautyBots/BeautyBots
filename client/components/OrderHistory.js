import React from 'react';
import { connect } from 'react-redux';
import { getOrderHistory } from '../store/orderHistory';
import { getCart } from '../store/cart';
import { Accordion } from 'react-bootstrap';
import SingleOrder from './SingleOrder';

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
