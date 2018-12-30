import * as ActionTypes from './ActionTypes'

export const Blogs = (state = {
  blogs: [],
  notify: { error: null, message: null }
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_BLOGS:
    return { ...state, blogs: action.data }
  case ActionTypes.ADD_COMMENT:
    return { ...state, blogs: action.data }
  case ActionTypes.NEW_BLOG:
    return { ...state, blogs: action.data }
  case ActionTypes.MESSAGE_BLOG:
    return { ...state, notify: action.data }
  case ActionTypes.MESSAGE_NULL:
    return { ...state, notify: { error: null, message: null } }
  case ActionTypes.ADD_LIKES:
    return { ...state, blogs: action.data }
  case ActionTypes.REMOVE_BLOG:
    return { ...state, blogs: action.data }
  default:
    return state
  }
}