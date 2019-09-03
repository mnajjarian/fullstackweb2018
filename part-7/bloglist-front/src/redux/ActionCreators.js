import * as ActionTypes from './ActionTypes'
import blogService from '../services/blogs'
import userService from '../services/users'
import loginService from '../services/logins'

const token = `bearer ${localStorage.getItem('token')}`
const config = {
  headers: { 'Authorization': token }
}

export const addBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()
  const sortingBlogs = blogs.sort((a, b) => b.likes - a.likes)
  dispatch({
    type: ActionTypes.ADD_BLOGS,
    data: sortingBlogs
  })
}

export const createBlog = (newBlog) => async (dispatch) => {
  try {
    const response = await blogService.create(newBlog, config)
    const blogs = await blogService.getAll()
    const message = `a new blog ${response.title} by ${localStorage.getItem('name')} added`
    dispatch(notification({ error: null, message }))
    dispatch({
      type: ActionTypes.NEW_BLOG,
      data: blogs
    })
    setTimeout(() => {
      dispatch({ type: ActionTypes.MESSAGE_NULL })
    }, 5000)
  } catch (error) {
    console.log(error)
  }
}

export const addComment = (blogId, comment) => async (dispatch) => {
  try {
    await blogService.addComment(blogId, comment)
    const blogs = await blogService.getAll()
    dispatch({
      type: ActionTypes.ADD_COMMENT,
      data: blogs
    })
    const blog = blogs.find(blog => blog.id === blogId)
    const message = `comment '${comment.comment}' added to blog ${blog.title} `
    console.log(blog)
    dispatch(notification({ error: null, message: message }))
    setTimeout(() => {
      dispatch({ type: ActionTypes.MESSAGE_NULL })
    }, 5000)
  } catch (error) {
    console.log(error.message)
  }
}

export const removeBlog = (blogId) => async (dispatch) => {
  try {
    await blogService.remove(blogId, config)
    const blogs = await blogService.getAll()
    dispatch({
      type: ActionTypes.REMOVE_BLOG,
      data: blogs
    })
  } catch (error) {
    console.log(error)
  }
}

export const addLikes = (blogId) => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    const blog = blogs.find(blog => blog.id === blogId)
    const blogToChange = { ...blog, likes: blog.likes + 1 }
    const blogsChanged = blogs.map(b => b.id !== blogId ? b : blogToChange)
    const sortingBlogs = blogsChanged.sort((a, b) => b.likes - a.likes)
    await blogService.update(blogId, blogToChange)
    dispatch({
      type: ActionTypes.ADD_LIKES,
      data: sortingBlogs
    })
  } catch (error) {
    console.log(error)
  }


}

const notification = (data) => {
  return {
    type: ActionTypes.MESSAGE_BLOG,
    data
  }
}

export const addUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: ActionTypes.ADD_USERS,
      data: users
    })
  }
}

export const loginUser = (creds) => async (dispatch) => {
  try {
    const response = await loginService.login(creds)
    dispatch(requestLogin(creds))
    localStorage.setItem('token', response.token)
    localStorage.setItem('creds', JSON.stringify(creds))
    localStorage.setItem('name', response.name )
    dispatch(receiveLogin(response))
  } catch (error) {
    dispatch(loginError(error.message))
    dispatch(notification({ error: 'wrong username or password', message: null }))
    setTimeout(() => {
      dispatch({ type: ActionTypes.MESSAGE_NULL })
    }, 5000)
  }
}

export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    data: creds
  }
}

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    data: response.token
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    data: message
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('creds')
    localStorage.removeItem('token')
    dispatch(receiveLogout())
  }
}

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const signupUser = (creds) => async (dispatch) => {
  try {
    const response = await userService.addUser(creds)
    dispatch(requestSignup(response))
    localStorage.setItem('token', response.token)
    localStorage.setItem('creds', JSON.stringify(creds))
    localStorage.setItem('name', response.name )
    dispatch(receiveSignup(response))
  } catch (error) {
    dispatch(signupError(error.message))
    dispatch(notification({ error: 'Username must be unique', message: null }))
    setTimeout(() => {
      dispatch({ type: ActionTypes.MESSAGE_NULL })
    }, 5000)
  }
}

export const requestSignup = (data) => {
  return {
    type: ActionTypes.SIGNUP__REQUEST,
    data: data
  }
}

export const receiveSignup = (response)  => {
  return {
    type: ActionTypes.SIGNUP__SUCCESS,
    data: response
  }
}

export const signupError = (message) => {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    data: message
  }
}