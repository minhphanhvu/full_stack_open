import React, { useState } from 'react'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons)
  const [ numbers, setNumbers ] = useState(props.numbers)
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ id, setId ] = useState(0)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: id,
      name: newName
    }
    const numberObject = {
      id : id,
      number: newNumber
    }

    const found = persons.filter((person) => person.name === personObject.name)

    if (found.length > 0) {
      const mes = `${newName} is already added to phonebook`
      window.alert(mes)
    }
    else {
    setId(id + 1)
    setPersons(persons.concat(personObject))
    setNumbers(numbers.concat(numberObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(parseInt((event.target.value), 10))
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        { persons.map(person => <li key={person.id}>{person.name}</li>) }
        { numbers.map(number => <>{number.number}</>) }
      </ul>
    </div>
  )
}

export default App