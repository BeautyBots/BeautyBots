import React from 'react';
import { connect } from 'react-redux';
import { getAdminOrders } from '../store/adminOrders';
import AdminOrderInfo from './AdminOrderInfo'

class AdminOrders extends React.Component {
  constructor() {
    super()
  }

 componentDidMount(){
    this.props.getOrders();
  }

  render() {
    //console.log("propsssss", this.props)
    const orders = this.props.orders || [];
    return (
      <div id="admin-orders">
        <h2>All Orders</h2>
        <table>
          <tbody>
          <tr>
							<th>Order Number</th>
							<th>Status</th>
							<th>Customer</th>
						</tr>
            {orders.map((order) => (
                <AdminOrderInfo
                  order={order}
                  key={order.id}
                />)
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log("stateeee", state)
  return {
    orders: state.adminOrders
  }
}

const mapDispatch = (dispatch) => {
	return {
    getOrders: () => dispatch(getAdminOrders())
	};
};

export default connect(mapState, mapDispatch)(AdminOrders);
