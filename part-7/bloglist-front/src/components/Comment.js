import React from 'react'
import { Form, Input, FormGroup, Button, Row } from 'reactstrap'

const Comment = (props) => {
  console.log(props.blog)
  return(
    <Row >
      <div>
        <h3>comments</h3>
        <Form onSubmit={props.submitComment} >
          <FormGroup>
            <Input type='text' name='comment' />
          </FormGroup>
          <Button type='submit' >add comment</Button>
        </Form>
      </div>
      <div>
        {/* <ul>
          {props.blog.comments.map(com =>
            <li key={com._id}>{com.comment}</li>
          )}
        </ul> */}
      </div>
    </Row>
  )
}
export default Comment