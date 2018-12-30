import React from 'react'
import { Form, Control } from 'react-redux-form'

const LoginForm = (props) => (
  <div>
    <h2>Log in to application</h2>
    <Form model='loginform' onSubmit={props.handleSubmit} >
      <div>
        <label>username: </label>
        <Control.text model='.username' />
      </div>
      <div>
        <label>password: </label>
        <Control.text model='.password' />
      </div>
      <button type='submit'>login</button>
    </Form>
  </div>
)

export default LoginForm