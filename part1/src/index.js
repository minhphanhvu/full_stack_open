import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

// App is a component
const App = () => {
  const name = 'Peter'
  const age = 10

  // App passes props to Hello component. Think of the props like a hash 
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))