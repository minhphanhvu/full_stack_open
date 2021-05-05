import React from 'react'

const Button = ({good, ok, bad, reset}) => {
  return (
    <>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
    </>
  )
}

export default Button