import React from 'react'
import UsersList from './UsersList'
import UserDetails from './UserDetails'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: []
    }
  }
  handleUser = (id) => (event) => {
    event.preventDefault()
    const user = this.props.users.find(u => u.id === id)
    this.setState({ user })
  }
  render() {
    return(
      <div>
        <UsersList users={this.props.users} handleUser={this.handleUser} />
        <UserDetails user={this.state.user} />
      </div>
    )
  }
}

export default User