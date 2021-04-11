import React, { useState } from 'react';
import Contract from './components/Contract.jsx';
import Form from './components/Form.jsx';
import Filter from './components/Filter.jsx';

const App = (props) => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setContacts ] = useState([])
  const [ id, setId ] = useState(0)

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      id: id,
      name: newName,
      number: newNumber
    }

    const found = persons.filter((person) => person.name === personObject.name)

    if (found.length > 0) {
      const mes = `${newName} is already added to phonebook`
      window.alert(mes)
    } else {
        setId(id + 1);
        setPersons(persons.concat(personObject));
        setContacts(filterContacts.concat(personObject));
        setNewName('');
        setNewNumber('');
    }
  }

  const addName = (event) => {
    event.preventDefault();
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value, 10)
  }

  const filterContact = (event) => {
    event.preventDefault();
    const filterValue = event.target.value.toLowerCase()

    if (filterValue.length === 0){
      setContacts(persons)
    } else {
      setContacts(persons.filter(person => person.name.toLowerCase().includes(filterValue)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterContact={filterContact}/>
      <h3>Add a new contact</h3>
      <Form addPerson={addPerson} newName={newName} addName={addName}
            newNumber={newNumber} addNumber={addNumber} />
      <h2>Numbers</h2>
      <ul>
        { filterContacts.map(person => <Contract key={person.id}
                                                 name={person.name}
                                                 number={person.number}/>) }
      </ul>
    </div>
  )
}

export default App