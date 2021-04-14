// Set env variables in local file
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(morgan('tiny'))

// Custom morgan for POST method
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

// Helpers

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

// Defien new morgan tokenconst getJSON = () => {
morgan.token('json', function(req, res) {{ return JSON.stringify(req.body)}} )

// RESTful routes

// Get all contacts
app.get('/api/persons', (request, response) => {
  Contact.find({})
         .then(contacts => {
           if (contacts) {
             response.json(contacts)
           } else {
             response.status(404).end()
           }
         })
         .catch(err => {
           console.log(err)
           response.status(500).end()
         })
})

// Get contact by id
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Contact.findById(id)
         .then(contact => {
           if (contact) {
             response.json(contact)
           } else {
             response.status(404).end()
           }
         })
         .catch(err => {
           console.log(err)
           response.status(500).end()
         })
})

// Delete a contact by id
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id, function(err) {
    if (err) {
      response.json({error: `${err.message}`})
      response.status(400).end()
    } else {
      response.json({error: 'Item deleted'})
      response.status(204).end()
    }
  })
})

// Return information about the collection
app.get('/api/info', (request, response) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      response.json({error: `${err.message}`})
      response.status(404).end()
    } else {
      const numberOfPersons = `<p>Phonebook has info for ${contacts.length} people</p>`
      const today = new Date(Date.now())
      const timeResponse = '<p>' + today.toUTCString() + '</p>'
      response.send(numberOfPersons + timeResponse)
    }
  })
})

// Creating a new contact
app.post('/api/persons', (request, response) => {
  const name = request.body.name
  const number = request.body.number

  if (!name || !number) {
    return response.status(400).json({
      error: 'either name or number missing'
    })
  }

  Contact.count({'name': name}, function (err, count) {
    if (count > 0) {
      return response.status(400).json({error: `Name must be unique`})
    }
  })

  const contact = new Contact({
    name: name,
    number: number
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
})

// Updating the existing contact
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const name = request.body.name
  const number = request.body.number

  const contact = {
    name: name,
    number: number
  }

  Contact.findByIdAndUpdate(id, contact, { new: true })
         .then(newContact => {
            response.json(newContact)
         })
         .catch(err => response.status(404).json({error: err.message}))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
