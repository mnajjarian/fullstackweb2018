import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blog = (props) => {

  const handleCreate = (values) => {
    const blog = {
      title: values.title,
      author: values.author,
      url: values.url,
      likes: 0,
      comments: []
    }
    props.createBlog(blog)
    props.resetBlogForm()
  }

  if(props.auth.isAuthenticated) {
    return (
      <Container>
        <Row>
          <Breadcrumb>
            <BreadcrumbItem active>Blogs</BreadcrumbItem>
            <BreadcrumbItem><Link to='/users'>Users</Link></BreadcrumbItem>
          </Breadcrumb>
        </Row>
        <Row>
          <Col md={6} >
            <Togglable buttonLabel='create new' >
              <BlogForm handleCreate={handleCreate} />
            </Togglable>
          </Col>
        </Row>
        {props.blogs.map(blog =>
          <Row key={blog.id} className="mt-3" >
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    <Link to={`/blogs/${blog.id}`} >
                      {blog.title} {blog.author}
                    </Link>
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    )
  }
  return(<div></div>)
}
export default Blog