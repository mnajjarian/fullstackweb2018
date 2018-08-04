const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFY':
    return action.message
  case 'HIDE':
    return ''
  default:
    return state
  }
}

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFY',
      message
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, time*1000)
  }
}

export default notificationReducer