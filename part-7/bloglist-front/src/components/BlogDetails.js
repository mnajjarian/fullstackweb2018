import React from 'react'
import { Redirect } from 'react-router-dom'
import Comment from './Comment'
import { Card, CardBody, CardSubtitle, CardLink, CardTitle,
  Row, Col, Button } from 'reactstrap'

const BlogDetails = (props) => {
  const addLike = (blogId) => () => {
    props.addLikes(blogId)
  }

  const submitComment =(event) => {
    event.preventDefault()
    const comment = {
      comment: event.target.comment.value
    }
    event.target.comment.value = ''
    props.addComment(props.blog.id, comment)
  }
  if(props.blog) {
    return(
      <Row>
        <Col md={6} >
          <Card>
            <CardBody>
              <CardTitle>
                <CardLink href={props.blog.url}>
                  {props.blog.title}
                </CardLink>{' '}
                <Button className="btn-sm" color="success" outline onClick={addLike(props.blog.id)} >{props.blog.likes} likes</Button>{' '}
                {localStorage.getItem('name') === props.blog.user.name &&
              <Button className="btn-sm" color="danger" onClick={props.handleDelete(props.blog.title, props.blog.author, props.blog.id)} >delete</Button>
                }
              </CardTitle>
              <CardSubtitle>
                <small>added by {props.blog.user.name}</small>{' '}
              </CardSubtitle>
            </CardBody>
          </Card>
          <Comment submitComment={submitComment} blog={props.blog} />
        </Col>
      </Row>
    )
  } else {
    return(
      <div>
        <Redirect to='/' />
      </div>
    )
  }
}

export default BlogDetails