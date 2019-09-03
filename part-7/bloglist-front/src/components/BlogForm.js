import React from 'react'
import { Form, FormGroup, Label, Input, Container, Button } from 'reactstrap'

const BlogForm = (props) => {
  const[state, setState] = React.useState({
    title: '',
    author: '',
    url: ''
  })
  const handleChange = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleCreate(state)
    setState({
      title: '',
      author: '',
      url: ''
    })
  }

  const { title, author, url } = state
  return (
    <Container>
      <h2>Create new blog</h2>
      <Form model='blogform' onSubmit={handleSubmit} >
        <FormGroup >
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Author</Label>
          <Input
            type="text"
            name="author"
            id="author"
            placeholder="author"
            value={author}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Url</Label>
          <Input
            type="text"
            name="url"
            id="url"
            placeholder="Url"
            value={url}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type='submit' color="primary" >Create</Button>
      </Form>
    </Container>
  )}

export default BlogForm