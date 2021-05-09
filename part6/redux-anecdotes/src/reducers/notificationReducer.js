const setNotification = (content, type) => {
  if (type === 'INCREASE_VOTE') {
    return {
      content: `You voted "${content}"`,
      style: {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    }
  } else if (type === 'NEW_ANECDOTE') {
    return {
      content: `"${content}" anecdote has been added`,
      style: {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
    data: {
      content: '',
      style: {
        display: 'none'
      }
    }
  }
}

const notificationReducer = (state = { content: '', style:  { display: 'none' } }, action) => {
  switch(action.type) {
  case 'INCREASE_VOTE': {
    return setNotification(action.data.anecdote, action.type)
  }
  case 'REMOVE_NOTIFICATION': {
    return action.data
  }
  case 'NEW_ANECDOTE': {
    return setNotification(action.data.newAnecdote.content, action.type)
  }
  default:
    return state
  }
}

export default notificationReducer