import React, { useState } from 'react'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ id, setId ] = useState(0)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: id,
      name: newName
    }

    const found = persons.filter((person) => person.name === personObject.name)
    if (found.length > 0) {
      const mes = `${newName} is already added to phonebook`
      window.alert(mes)
    }
    else {
    setId(id + 1)
    setPersons(persons.concat(personObject))
    setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
                  value={newName} 
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { persons.map(person => <li key={person.id}>{person.name}</li>) }
      </ul>
    </div>
  )
}

export default App