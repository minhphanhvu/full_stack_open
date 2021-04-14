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

app.get('/api/persons', (request, response) => {
  Contact.find({}, function (err, contacts) {
    if (err) {
      response.json({error: `${err.message}`})
      response.status(404).end()
    } else {
      response.json(contacts)
    }
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Contact.findById(id, function (err, contact) {
    if (err) {
      response.json({error: `${err.message}`})
      response.status(404).end()
    } else {
      response.json(contact)
    }
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  console.log(persons)
  response.status(204).end()
})

app.get('/api/info', (request, response) => {
  const numberOfPersons = `<p>Phonebook has info for ${persons.length} people</p>`
  const today = new Date(Date.now())
  const timeResponse = '<p>' + today.toUTCString() + '</p>'

  response.send(numberOfPersons + timeResponse)
})

app.post('/api/persons', (request, response) => {
  // Define custom morgan
  const name = request.body.name
  const number = request.body.number

  const foundName = persons.find(p => p.name === name)

  if (foundName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  else if (!name || !number) {
    return response.status(400).json({
      error: 'either name or number missing'
    })
  }

  const person = {
    name: name,
    number: number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(persons)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})