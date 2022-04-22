import React from "react";
import { connect } from "react-redux"

class UserList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const users = this.props.users

    return (
      <div id = "users">
         <h2>USERS:</h2>

           {users.map((user) => (
             <div>
              <p>ID: {user.id}, USERNAME: {user.username}</p>
             </div>
           ))}

      </div>

    )
  }
}

const mapState = ({users}) => {
  return {
    users
  }
}

export default connect(mapState, null)(UserList)
