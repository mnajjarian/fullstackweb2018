import React from 'react'
import { Form, Control } from 'react-redux-form'

const BlogForm = (props) => (
  <div>
    <h2>Create new blog</h2>
    <Form model='blogform' onSubmit={props.handleCreate} >
      <div>
        <label>Title: </label>
        <Control.text model='.title' />
      </div>
      <div>
        <label>Author: </label>
        <Control.text model='.author' />
      </div>
      <div>
        <label>Url: </label>
        <Control.text model='.url' />
      </div>
      <button type='submit' >create</button>
    </Form>
  </div>
)

export default BlogForm