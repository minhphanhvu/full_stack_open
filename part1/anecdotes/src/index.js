import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <>
    <button onClick={onClick}>
      {text}
    </button>
  </>
)

const Vote = (props) => (
  <>
    <div>has {props.vote}</div>
  </>
)

const Anecdote = (props) => (
  <>
    <div>
      <h2>{props.header}</h2>
      <p>{props.anecdote}</p>
    </div>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  const generateNumber = () => {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * Math.floor(anecdotes.length))
    } while (randomNumber === selected)

    setSelected(randomNumber)
  }

  const getVote = () => {
    const copyVotes = [...allVotes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const findIndexOfMax = (arr) => {

    let max = arr[0]
    let maxIndex = 0

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max){
        max = arr[i]
        maxIndex = i
      }
    }

    return maxIndex;
  }

  const maxIndex = findIndexOfMax([...allVotes])

  return (
    <>
      <Anecdote header="Anecdote of the day" anecdote={props.anecdotes[selected]}/>
      <Vote vote={allVotes[selected]}/>
      <Button onClick={getVote} text="vote"/>
      <Button onClick={generateNumber} text="next anecdote"/>
      <Anecdote header="Anecdote with most votes" anecdote={props.anecdotes[maxIndex]}/>
      <Vote vote={allVotes[maxIndex]}/>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)