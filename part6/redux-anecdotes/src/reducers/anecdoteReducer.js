const orderVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

export const increVote = (anecdote, id) => {
  return {
    type: 'INCREASE_VOTE',
    data: {
      anecdote: anecdote,
      id: id,
    }
  }
}

export const createAnecdote = (newAnecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      newAnecdote
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE_ANECDOTES',
    data: {
      anecdotes
    }
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
  case 'INITIALIZE_ANECDOTES': {
    return action.data.anecdotes
  }
  case 'INCREASE_VOTE': {
    const anecdote = state.find(anec => anec.id === action.data.id)
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    return orderVotes(state.map(anec => anec.id !== action.data.id ? anec : changedAnecdote))
  }
  case 'NEW_ANECDOTE': {
    return orderVotes([...state, action.data.newAnecdote])
  }
  default:
    return orderVotes(state)
  }
}

export default anecdoteReducer