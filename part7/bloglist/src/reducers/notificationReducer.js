export const setNotification = (style, message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      style,
      message
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      style: '',
      message: ''
    }
  }
}

const notificationReducer = (state = {style: '', message: ''}, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export default notificationReducer