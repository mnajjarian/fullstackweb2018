import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter,
  Form, FormGroup, Label, Input } from 'reactstrap'

const LoginForm = (props) => {
  const[state, setState] = React.useState(
    {
      username: '',
      password: '',
      name: '',
    })
  const[isOpen, setIsOpen] = React.useState(false)
  const[show, setShow] = React.useState(false)
  const handleChange = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })
  const handleToggle = () => {
    setIsOpen(!isOpen)
    setShow(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleSubmit(state)
    setIsOpen(false)
    setShow(false)
    setState({
      name: '',
      username: '',
      password: ''
    })
  }
  const { username, password, name } = state
  return (
    <>
      <Button onClick={handleToggle} >Login</Button>
      <Modal isOpen={isOpen} toggle={handleToggle} >
        <ModalHeader toggle={handleToggle} >
          <h2>Log in to application</h2>
        </ModalHeader>
        <Form model='loginform' onSubmit={handleSubmit} >
          <ModalBody>
            {show &&
                <FormGroup>
                  <Label for="name" >Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </FormGroup>
            }
            <FormGroup>
              <Label for="username" >Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" >Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' color="primary" >{show ? 'Sign Up' : 'Login'}</Button>{' '}
            <Button onClick={() => setShow(!show)} color="info" >{show ? 'Cancel' : 'Sign Up'}</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>

  )}

export default LoginForm