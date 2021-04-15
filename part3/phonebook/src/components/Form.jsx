import React from 'react'

const Form = ({ addPerson, newName, addName, newNumber, addNumber }) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <div className="newContact">
            <label htmlFor="name">Name: </label>
            <input id="name" value={newName} onChange={addName} type="text" />
        </div>
        <div className="newContact">
            <label htmlFor="number">Number: </label>
            <input id="number" value={newNumber} onChange={addNumber} type="text"/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form