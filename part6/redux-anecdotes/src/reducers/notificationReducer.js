const setNotification = (content, type) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const newState = {
    content: '',
    style,
  }
  if (type === 'INCREASE_VOTE') {
    return { ...newState, content: `You voted "${content}"`,
    }
  } else if (type === 'NEW_ANECDOTE') {
    return { ...newState, content: `"${content}" anecdote has been added`,
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