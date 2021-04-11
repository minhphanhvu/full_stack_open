import React, { useState, useEffect } from 'react';
import Contract from './components/Contract.jsx';
import Form from './components/Form.jsx';
import Filter from './components/Filter.jsx';
import contactService from './components/contactService.jsx';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setContacts ] = useState([])

  // 'RESTful' handling resources

  // Extract db.json (all contacts) from server
  useEffect(() => {
    contactService
      .getAllContacts()
      .then(initialContacts => {
        setPersons(initialContacts);
        setContacts(initialContacts);
      })
  }, [])

  // Add new contact to the db.json + update the contact
  const addPerson = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber
    }

    const existContacts = persons.filter((person) => person.name === newContact.name)
    const existContact = existContacts[0];

    if (existContacts.length > 0) {
      const mes = `${newName} is already added to phonebook, replace the old number with 
                   a new one?`;
      const confirm = window.confirm(mes);
      if (confirm) {
        contactService
          .updateContact(existContact.id, newContact)
          .then(newContact => {
            setContacts(persons.map(contact=> contact.id !== newContact.id ? contact : newContact));
          })
      }
    } else {
        contactService
          .createContact(newContact)
          .then(newContact => {
            setPersons(persons.concat(newContact));
            setContacts(filterContacts.concat(newContact));
          })
    }
    setNewName('');
    setNewNumber('');
  }

  // Delete a contact
  const destroyContact = (event, id) => {
    event.preventDefault();
    const destroyedContact = persons.find((contact) => contact.id === id);
    const confirm = window.confirm(`Delete ${destroyedContact.name} contact?`);
    if (confirm) {
      contactService
        .destroyContact(id)
        .then(() => {
          const filteredContacts = persons.filter((contact) => contact.id !== id);
          setPersons(filteredContacts);
          setContacts(filteredContacts);
          alert(`${destroyedContact.name} has been deleted.`);
        })
    }
  }

  // Helpers event handler + filter handler
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
      {/*Filter function*/}
      <h2>Phonebook</h2>
      <Filter filterContact={filterContact}/>

      {/*Add new contact*/}
      <h3>Add a new contact</h3>
      <Form addPerson={addPerson} newName={newName} addName={addName}
            newNumber={newNumber} addNumber={addNumber} />

      {/*Contacts (filtered)*/}
      <h2>Numbers</h2>
      <ul>
        {filterContacts.map(contact => <Contract key={contact.id}
                                                 id={contact.id}
                                                 name={contact.name}
                                                 number={contact.number} 
                                                 destroyContact={destroyContact} />)}
      </ul>
    </div>
  )
}

export default App