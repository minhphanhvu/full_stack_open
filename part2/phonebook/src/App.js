import React, { useState } from 'react'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ id, setId ] = useState(0)
  const [ tempName, setTempName ] = useState('')

  const nameNotExist = () => {
    return persons.find( ({name}) => name === tempName )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: id,
      name: newName
    }

    setId(id + 1)
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setTempName(event.target.value)
    if (nameNotExist === undefined) {
      setNewName(event.target.value)
    }
    else {
      const mes = `${newName} is already added to phonebook`
      window.alert(mes)
    }
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