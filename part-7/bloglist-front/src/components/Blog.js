import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  addLike = (blogId) => () => {
    this.props.addLikes(blogId)
  }

  handleCreate = (values) => {
    const blog = {
      title: values.title,
      author: values.author,
      url: values.url,
      likes: 0,
      comments: []
    }
    this.props.createBlog(blog)
    this.props.resetBlogForm()
  }

  render() {
    if(this.props.auth.isAuthenticated) {
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
                <BlogForm handleCreate={this.handleCreate} />
              </Togglable>
            </Col>
          </Row>
          {this.props.blogs.map(blog =>
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
}
export default Blog