import React from 'react';
import { connect } from 'react-redux';

class AdminOrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.order.id,
      status: this.props.order.status,
      username: this.props.order.user.username
    }


  }

  render() {
    const { id, username, status} = this.state;
    console.log("INFO STATE", this.state);
    return (
      <tr>
        <td>{id}</td>
        <td>{status}</td>
        <td>{username}</td>
      </tr>
    )
  }
}

export default AdminOrderInfo;
