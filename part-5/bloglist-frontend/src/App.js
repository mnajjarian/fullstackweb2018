import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      
    }
  }

  addLikes = (id) => {
    return () => {
   const blog = this.state.blogs.find(b => b.id === id)
   const changedBlog = {
     user: blog.user._id,
     title: blog.title,
     author: blog.author,
     likes: blog.likes + 1,
     url: blog.url
     
   }
   
   blogService
   .update(id, changedBlog)
   .then(changedBlog => {
     this.setState({
       blogs: this.state.blogs.map(blog => blog.id !== id ? blog : changedBlog)
      })
   })
   .catch(error => {
     this.setState({
       error: `blog ${blog.title} unfortunately has already been removed from the server`,
       blogs: this.state.blogs.filter(blog => blog.id !== id)
     })
     setTimeout(() => {
       this.setState({ error: null })
     }, 5000);
   })
    } 
  }


  addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    this.createBlog.toggleVisibility()
  
    blogService
    .create(blogObject)
    .then(newBlog => {
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: '',
        error: 'a new blog ' + this.state.title + ' by ' + this.state.user.name + ' added' 
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000);
    })
  }

  removeBlog = (id, title, author) => {
    return() => {
      if(window.confirm(`delete ${title} by ${author}`)) {

      blogService
      .remove(id)
      .then(() => {
        this.setState({
          blogs: this.state.blogs.map(blog => blog.id !== id)
        })
      })
      .catch(error => {
        this.setState({
          error: `blog unfortunately has already been removed from the server`,
          blogs: this.state.blogs.map(blog => blog.id !== id)
        })
      }) 
      window.location.reload()
    }
  }
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch (exception) {
      this.setState({
        error: 'Username or password incorrect'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000);
    }
  }
  
  logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }
  
    handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCreateNewBlog = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
    const loginForm = () => (
      <Togglable buttonLabel='login'>
      <LoginForm
      visible={this.state.visible}
      username={this.state.username}
      password={this.state.password}
      handleChange={this.handleLoginFieldChange}
      handleSubmit={this.login}
      />
      </Togglable>
    )

    const createBlog = () => (
      <Togglable buttonLabel='new blog' ref={component => this.createBlog = component} >
      <BlogForm
      onSubmit={this.addBlog}
      title={this.state.title}
      author={this.state.author}
      url={this.state.url}
      handleChange={this.handleCreateNewBlog}
      />
      </Togglable>
      )
      
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={this.state.error} />

        {this.state.user === null ?
        loginForm() : 
        <div>
          <p>{this.state.user.name} logged in <button onClick={this.logout} >logout</button></p>
          {createBlog()}
        {this.state.blogs.sort((a, b) => b.likes > a.likes).map(blog =>
        <Blog
           key={blog.id}
           blog={blog}
           handleUpdate={this.addLikes(blog.id)}
           removeBlog={this.removeBlog(blog.id, blog.title, blog.author)}
           user={this.state.user}
           />)} 
           </div> }
        
        
      </div>
    );
  }
}

export default App;
