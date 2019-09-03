import React from 'react'
import LoginForm from './LoginForm'
import { Nav, Navbar, NavbarBrand, NavItem, Button } from 'reactstrap'

const Header = (props) => {

  const handleLogout = () => {
    props.logoutUser()
  }

  const handleSubmit = (user) => {
    if(user.name.length < 1) {
      props.loginUser(user)
      props.resetLoginForm()
    } else {
      props.signupUser(user)
    }
  }

  return(
    <React.Fragment>
      <Navbar color='primary' >
        <div className='container' >
          <NavbarBrand className='mr-auto' >Blog App</NavbarBrand>
          <Nav className='ml-auto' navbar >
            <NavItem>
              { props.auth.isAuthenticated ?
                <div>
                  <div className="navbar-text mr-3">{JSON.parse(localStorage.getItem('creds')).username}</div>
                  <Button onClick={handleLogout} > logout</Button>
                </div> :
                <div>
                  <LoginForm handleSubmit={handleSubmit} />
                </div>
              }
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </React.Fragment>

  )
}

export default Header