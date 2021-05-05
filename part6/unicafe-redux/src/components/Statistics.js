import React from 'react'

const Statistics = ({store}) => {
  const total = () => {
    const state = store.getState()
    return state.good + state.bad + state.ok
  }

  const average = () => {
    const state = store.getState()
    const totalGood = state.good - state.bad
    return totalGood/total()
  }

  const positive = () => {
    const state = store.getState()
    return state.good/total()
  }

  const stats = () => {
    if (!total()) {
      return (
        <>
          <div>No feedback given</div>
        </>
      )
    }
    return (
      <>
        <table>
          {Object.keys(store.getState()).map(key => {
            return (
              <>
                <tr>
                  <td>{key}</td>
                  <td>{store.getState()[key]}</td>
                </tr>
              </>
            )
          })}
          <tr>
            <td>all</td>
            <td>{total()}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average()}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive()}</td>
          </tr>
        </table>
      </>
    )
  }

  return (
    <>
      <h3>Statistics</h3>
      {stats()}
    </>
  )
}

export default Statistics