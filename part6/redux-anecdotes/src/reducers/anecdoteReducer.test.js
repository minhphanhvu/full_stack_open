import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('return new state with action INCREASE_VOTE', () => {
    const state = [
      {
        content: 'If it hurts, do it more often',
        votes: 0,
        id: 150
      },
    ]
    const action = {
      type: 'INCREASE_VOTE',
      data: {
        id: 150
      }
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState[0].votes).toBe(1)
  })

  test('return new state with action NEW_ANECDOTE', () => {
    const state = []
    const anecdote = {
      content: 'If it hurts, do it more often',
      votes: 0,
      id: 150
    }
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        newAnecdote: anecdote
      }
    }

    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState).toHaveLength(1)
    expect(newState[0].votes).toBe(0)
  })
})