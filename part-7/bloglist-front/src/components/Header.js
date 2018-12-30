import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { Nav, Navbar, NavbarBrand, NavItem, Button } from 'reactstrap'

const Header = (props) => {
  const handleLogout = () => {
    props.logoutUser()
  }

  const handleSubmit = (values) => {
    const user = {
      username: values.username,
      password: values.password
    }
    props.loginUser(user)
    props.resetLoginForm()
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
                  <div className="navbar-text mr-3">{localStorage.getItem('name')}</div>
                  <Button onClick={handleLogout} > logout</Button>
                </div> :
                <div>
                  <Togglable buttonLabel='login'>
                    <LoginForm handleSubmit={handleSubmit} />
                  </Togglable>
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