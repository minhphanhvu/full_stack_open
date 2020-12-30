import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = (props) => {
  if (props.feedback.all_feedback === 0)
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
      <ul>
        <li>good: {props.feedback.good}</li>
        <li>neutral: {props.feedback.neutral}</li>
        <li>bad: {props.feedback.bad}</li>
      </ul>
      <p>All: {props.feedback.all_feedback}</p>
      <p>Average: {props.feedback.average}</p>
      <p>Positive feedback: {props.feedback.positive}</p>
    </>
    )
  }
}

const Statistics = (props) => {
  return (
    <>
      <Feedback feedback={props.statistics}/>
    </>
  )
}

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

  return (
    <>
      <h4>give feed back</h4>
      <button onClick={ () => setGood(good + 1) }>good</button>
      <button onClick={ () => setNeutral(neutral + 1) }>neutral</button>
      <button onClick={ () => setBad(bad + 1) }>bad</button>
      <Statistics statistics={statistics}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)