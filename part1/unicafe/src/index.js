import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
  <>
    {text}: {value}
  </>
)

const Statistics = (props) => {
  if (props.statistics.all_feedback === 0)
  {
    return (
      <>
        <h4>statistics</h4>
        <p>No feedback given</p>
      </>
    )
  }
  else {
    return (
    <>
    <h4>statistics</h4>
      <table>
        <tbody>
          <tr><td><Statistic text="good" value={props.statistics.good}/></td></tr>
          <tr><td><Statistic text="good" value={props.statistics.good}/></td></tr>
          <tr><td><Statistic text="neutral" value={props.statistics.neutral}/></td></tr>
          <tr><td><Statistic text="bad" value={props.statistics.bad}/></td></tr>
          <tr><td><Statistic text="All" value={props.statistics.all_feedback}/></td></tr>
          <tr><td><Statistic text="Average" value={props.statistics.average}/></td></tr>
          <tr><td><Statistic text="Positive" value={props.statistics.positive}/></td></tr>
        </tbody>
      </table>
    </>
    )
  }
}

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>
      {text}
    </button>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all_feedback: good + neutral + bad,
    average: (good - bad)/(good + neutral + bad),
    positive:good/(good + neutral + bad)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  return (
    <>
      <h4>give feed back</h4>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Statistics statistics={statistics}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)