import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { addBlogs, addUsers, loginUser, logoutUser, createBlog, addLikes, removeBlog, addComment } from './redux/ActionCreators'
import { actions } from 'react-redux-form'
import Notification from './components/Notification'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Header from './components/Header'
import Blog from './components/Blog'


class App extends React.Component {
  componentDidMount() {
    this.props.addBlogs()
    this.props.addUsers()
  }

  handleDelete = (title, author, blogId) => () => {
    if(window.confirm(`delete '${title}' by ${author}?`)) {
      this.props.removeBlog(blogId)
    }
    return
  }

  render() {
    const blogWithId = (blogId) =>
      this.props.blogs.blogs.find((blog) => blog.id === blogId)
    return (
      <div>
        <Notification notify={this.props.blogs.notify}/>
        <Header
          createBlog={this.props.createBlog}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          resetBlogForm={this.props.resetBlogForm}
          resetLoginForm={this.props.resetLoginForm}
          auth={this.props.auth} />
        <Switch>
          <Route exact path='/' render={() => <Blog
            auth={this.props.auth}
            blogs={this.props.blogs.blogs}
            removeBlog={this.props.removeBlog}
            createBlog={this.props.createBlog}
            resetBlogForm={this.props.resetBlogForm}
          />}
          />
          <Route path='/blogs/:blogId' render={({ match }) => <BlogDetails
            blog={blogWithId(match.params.blogId)}
            handleDelete={this.handleDelete}
            addLikes={this.props.addLikes}
            addComment={this.props.addComment} />}/>
          <Route path='/users' render={() => <User
            users={this.props.users.users}
          />}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  addBlogs: () => { dispatch(addBlogs())},
  addComment: (blogId, comment) => { dispatch(addComment(blogId, comment))},
  addUsers: () => { dispatch(addUsers())},
  addLikes: (blogId) => { dispatch(addLikes(blogId))},
  resetLoginForm: () => { dispatch(actions.reset('loginform'))},
  resetBlogForm: () => { dispatch(actions.reset('blogform'))},
  loginUser: (user) => { dispatch(loginUser(user))},
  logoutUser: () => { dispatch(logoutUser())},
  createBlog: (newBlog) => { dispatch(createBlog(newBlog))},
  removeBlog: (blogId) => { dispatch(removeBlog(blogId))}
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))