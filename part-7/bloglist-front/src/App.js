import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { addBlogs, addUsers, loginUser, logoutUser, createBlog, addLikes, removeBlog, addComment, signupUser } from './redux/ActionCreators'
import { actions } from 'react-redux-form'
import Notification from './components/Notification'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import Header from './components/Header'
import Blog from './components/Blog'


const App = (props) => {
  React.useEffect(() => {
    props.addBlogs()
    props.addUsers()
  }, [])

  const handleDelete = (title, author, blogId) => () => {
    console.log('delet')
    if(window.confirm(`delete '${title}' by ${author}?`)) {
      props.removeBlog(blogId)
    }
    return
  }
  const blogWithId = (blogId) =>
    props.blogs.blogs.find((blog) => blog.id === blogId)
  return (
    <div>
      <Notification notify={props.blogs.notify}/>
      <Header
        createBlog={props.createBlog}
        loginUser={props.loginUser}
        logoutUser={props.logoutUser}
        signupUser={props.signupUser}
        resetBlogForm={props.resetBlogForm}
        resetLoginForm={props.resetLoginForm}
        auth={props.auth} />
      <Switch>
        <Route exact path='/' render={() => <Blog
          auth={props.auth}
          blogs={props.blogs.blogs}
          removeBlog={props.removeBlog}
          createBlog={props.createBlog}
          resetBlogForm={props.resetBlogForm}
        />}
        />
        <Route path='/blogs/:blogId' render={({ match }) => <BlogDetails
          blog={blogWithId(match.params.blogId)}
          handleDelete={handleDelete}
          addLikes={props.addLikes}
          addComment={props.addComment} />}/>
        <Route path='/users' render={() => <User
          users={props.users.users}
        />}
        />
      </Switch>
    </div>
  )}

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
  signupUser: (user) => { dispatch(signupUser(user))},
  createBlog: (newBlog) => { dispatch(createBlog(newBlog))},
  removeBlog: (blogId) => { dispatch(removeBlog(blogId))}
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))