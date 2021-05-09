import anecdoteService from '../services/anecdotes'

const orderVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

export const increVote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.changeVotes(anecdote)
    dispatch({
      type: 'INCREASE_VOTE',
      data: {
        changedAnecdote
      }
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        newAnecdote
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: {
        anecdotes
      }
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
  case 'INITIALIZE_ANECDOTES': {
    return action.data.anecdotes
  }
  case 'INCREASE_VOTE': {
    const changedAnecdote = action.data.changedAnecdote
    const id = changedAnecdote.id
    return orderVotes(state.map(anec => anec.id !== id ? anec : changedAnecdote))
  }
  case 'NEW_ANECDOTE': {
    return orderVotes([...state, action.data.newAnecdote])
  }
  default:
    return orderVotes(state)
  }
}

export default anecdoteReducer