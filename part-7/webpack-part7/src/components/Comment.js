import React from 'react'
import { Form, Input, FormGroup, Button, Card, CardBody,
  CardSubtitle, CardTitle, Col } from 'reactstrap'

const Comment = (props) => {
  return(
    <>
      <Card>
        <h3>comments</h3>
        {props.blog.comments.map(com =>
          <CardBody key={com._id}>
            <CardTitle>
              {com.comment}
            </CardTitle>
            <CardSubtitle>
                Created at {new Intl.DateTimeFormat('en-us',
                { year: 'numeric', month: 'short', day: '2-digit' })
                .format(new Date(Date.parse(com.createdAt)))}
            </CardSubtitle>
          </CardBody>
        )}
      </Card>
      <Col >
        <Form onSubmit={props.submitComment} >
          <FormGroup>
            <Input type='text' name='comment' />
          </FormGroup>
          <Button type='submit' >add comment</Button>
        </Form>
      </Col>
      </>
  )
}
export default Comment