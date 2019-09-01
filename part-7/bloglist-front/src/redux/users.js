import * as ActionTypes from './ActionTypes'

export const Users = (state = {
  users: []
}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_USERS:
    return { ...state, users: action.data }
  default:
    return state
  }
}