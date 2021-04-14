import React, { useState, useEffect } from 'react';
import Contract from './components/Contract.jsx';
import Form from './components/Form.jsx';
import Filter from './components/Filter.jsx';
import contactService from './components/contactService.jsx';
import Message from './components/Message.jsx';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setContacts ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')

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
    const contact = {
      name: newName,
      number: newNumber
    }

    const existContacts = persons.filter((person) => person.name === contact.name)
    const existContact = existContacts[0];

    if (existContacts.length > 0) {
      const mes = `${newName} is already added to phonebook, replace the old number with 
                   a new one?`;
      const confirm = window.confirm(mes);
      if (confirm) {
        contactService
          .updateContact(existContact.id, contact)
          .then(updatedContact => {
            setMessage(`${updatedContact.name} has been updated.`);
            setMessageType('success');
            setContacts(persons.map(contact => contact.name !== updatedContact.name ? contact : updatedContact));
          })
          .catch(() => {
            setMessage(`${contact.name} information has already been removed from the server.`);
            setMessageType('error');
            setContacts(persons.filter(contact => contact.name !== existContact.name));
          })
      }
    } else {
        contactService
          .createContact(newContact)
          .then(newContact => {
            setMessage(`${newContact.name} has been added.`);
            setMessageType('success');
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
          setMessage(`${destroyedContact.name}'s contact has been deleted.`);
          setMessageType('error');
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
      <Message message={message} messageType={messageType} />
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