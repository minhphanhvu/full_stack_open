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

// Defien new morgan tokenconst getJSON = () => {
morgan.token('json', function(req, res) {{ return JSON.stringify(req.body)}} )

// RESTful routes

// Get all contacts
app.get('/api/persons', (request, response, next) => {
  Contact.find({})
         .then(contacts => {
           if (contacts) {
             response.json(contacts)
           } else {
             response.status(404).end()
           }
         })
         .catch(err => next(err))
})

// Get contact by id
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Contact.findById(id)
         .then(contact => {
           if (contact) {
             response.json(contact)
           } else {
             response.status(404).end()
           }
         })
         .catch(err => next(err))
})

// Delete a contact by id
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Contact.findByIdAndDelete(id)
         .then(result => {
           console.log(result)
           response.status(204).end()
         })
         .catch(err => next(err))
})

// Return information about the collection
app.get('/api/info', (request, response, next) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      next(err)
    } else {
      const numberOfPersons = `<p>Phonebook has info for ${contacts.length} people</p>`
      const today = new Date(Date.now())
      const timeResponse = '<p>' + today.toUTCString() + '</p>'
      response.send(numberOfPersons + timeResponse)
    }
  })
})

// Creating a new contact
app.post('/api/persons', (request, response, next) => {
  const name = request.body.name
  const number = request.body.number

  Contact.count({'name': name}, function (err, count) {
    if (count > 0) {
      return response.status(400).json({error: `Name must be unique`})
    }
  })

  const contact = new Contact({
    name: name,
    number: number
  })

  contact.save()
         .then(savedContact => {
           response.json(savedContact)
         })
         .catch(err => next(err))
})

// Updating the existing contact
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const name = request.body.name
  const number = request.body.number

  const contact = {
    name: name,
    number: number
  }

  Contact.findByIdAndUpdate(id, contact, { new: true })
         .then(updatedContact => {
            if(updatedContact) {
              response.json(updatedContact)
            } else {
              throw new Error('None existing contact')
            }
         })
         .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Hanlder requests with errors
const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
