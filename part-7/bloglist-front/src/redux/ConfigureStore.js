import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createForms } from 'react-redux-form'
import thunk from 'redux-thunk'
import { Blogs } from './blogs'
import { Users } from './users'
import { Auth } from './auth'

const InitialLoginForm = {
  username: '',
  password: ''
}

const InitialBlogForm = {
  title: '',
  author: '',
  url: ''
}
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      blogs: Blogs,
      users: Users,
      auth: Auth,
      ...createForms({
        loginform: InitialLoginForm,
        blogform: InitialBlogForm
      })
    }),
    applyMiddleware(thunk)
  )
  return store
}