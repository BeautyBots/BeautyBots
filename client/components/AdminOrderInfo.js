import React from "react";

class AdminOrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.order.id,
      status: this.props.order.status,
      username: this.props.order.user
        ? this.props.order.user.username
        : `Guest: ${this.props.order.email}`,
    };
  }

  render() {
    const { id, username, status } = this.state;

    return (

          <tr>
            <td>{id}</td>
						<td>{status}</td>
						<td>{username}</td>
          </tr>
    );
  }
}


export default AdminOrderInfo;
