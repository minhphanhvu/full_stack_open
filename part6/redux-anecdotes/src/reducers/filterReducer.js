export const setFilter = (anecdotes, value) => {
  return {
    type: 'FILTER',
    data: {
      value: value,
      anecdotes
    }
  }
}

const filterReducer = (state = [], action) => {
  switch (action.type) {
  case 'FILTER': {
    return action.data.anecdotes.filter(anec => anec.content.includes(action.data.value))
  }
  default:
    return state
  }
}

export default filterReducer