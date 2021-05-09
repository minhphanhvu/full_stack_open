import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdote) => {
  const newAnecdote = {
    content: anecdote,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const changeVotes = async (anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(baseUrl + `/${anecdote.id}`, changedAnecdote)
  return response.data
}

export default { getAll, createAnecdote, changeVotes }