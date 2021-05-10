import React from 'react'
import { connect } from 'react-redux'
import { increVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.increVote(anecdote)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.filtered.length !== 0 ? state.filtered : state.anecdotes
  }
}

const mapDispatchToProsp = {
  increVote,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProsp
)(AnecdoteList)
export default ConnectedAnecdoteList