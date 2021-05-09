import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.filtered.length !== 0 ? state.filtered : state.anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(increVote(anecdote))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList