import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle } from 'reactstrap'
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
        <div >
          <Breadcrumb>
            <BreadcrumbItem active>blogs</BreadcrumbItem>
            <BreadcrumbItem><Link to='/users'>users</Link></BreadcrumbItem>
          </Breadcrumb>
          <Togglable buttonLabel='create new' >
            <BlogForm handleCreate={this.handleCreate} />
          </Togglable>
          {this.props.blogs.map(blog =>
            <Card key={blog.id}>
              <CardBody>
                <CardTitle>
                  <Link to={`/blogs/${blog.id}`} >
                    {blog.title} {blog.author}
                  </Link>
                </CardTitle>
              </CardBody>
            </Card>
          )}
        </div>
      )
    }
    return(<div></div>)
  }
}
export default Blog