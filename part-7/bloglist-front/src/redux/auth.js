import * as ActionTypes from './ActionTypes'

export const Auth = (state = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  errMess: null
}, action) => {
  switch (action.type) {
  case ActionTypes.LOGIN_REQUEST:
    return { ...state,
      isAuthenticated: false,
      user: action.data
    }
  case ActionTypes.LOGIN_SUCCESS:
    return { ...state,
      isAuthenticated: true,
      errMess: '',
      token: action.data
    }
  case ActionTypes.LOGIN_FAILURE:
    return { ...state,
      isAuthenticated: false,
      errMess: action.data,
    }
  case ActionTypes.LOGOUT_REQUEST:
    return { ...state,
      isAuthenticated: true
    }
  case ActionTypes.LOGOUT_SUCCESS:
    return { ...state,
      isAuthenticated: false,
      token: '',
      user: null
    }
  default:
    return state
  }
}