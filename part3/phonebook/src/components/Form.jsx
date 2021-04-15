import React from 'react'

const Form = ({ addPerson, newName, addName, newNumber, addNumber }) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={addName} type="text" />
        </div>
        <div>
            number: <input value={newNumber} onChange={addNumber} type="text"/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form