import React from 'react'
import { Redirect } from 'react-router-dom'
import Comment from './Comment'
import { Card, CardBody, CardTitle, CardLink, CardText, Button,
  CardFooter, CardSubtitle, CardHeader } from 'reactstrap'

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
      <div>
        <Card>
          <CardBody>
            <CardTitle>{props.blog.title}</CardTitle>
            <CardLink href={props.blog.url}>
              {props.blog.url}
            </CardLink>
            <CardText>
              {props.blog.likes} likes <Button outline onClick={addLike(props.blog.id)} > like</Button>
            </CardText>
            <CardText>
              <small>added by {props.blog.user.name}</small>
            </CardText>
            {localStorage.getItem('user') === props.blog.user.name ?
              <Button onClick={props.handleDelete(props.blog.title, props.blog.author, props.blog.id)} >delete</Button> :
              <div>
                <Comment submitComment={submitComment} blog={props.blog} />
              </div>}
          </CardBody>
        </Card>
      </div>
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