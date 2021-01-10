import React, { useState } from 'react'
import Contract from './components/Contract'

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setContacts ] = useState([])
  const [ id, setId ] = useState(0)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: id,
      name: newName,
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
    setContacts(persons.concat(personObject))
    console.log(persons)
    setNewName('')
    setNewNumber('')
    }
  }

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value, 10)
  }

  const filterContact = (event) => {
    const filterValue = event.target.value.toLowerCase()
    if (filterValue.length === 0){
      setContacts(persons)
    }
    else {
    setContacts(persons.filter(person => person.name.toLowerCase().includes(filterValue)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <label htmlFor="filter">filter shown with</label>
        <input name="filter" id="filter" type="text" onChange={filterContact} />
      <h3>Add a new contact</h3>
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
        { filterContacts.map( person => <Contract key={person.id} name={person.name} number={person.number}/>)}
      </ul>
    </div>
  )
}

export default App