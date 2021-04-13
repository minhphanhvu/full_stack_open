const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny'))

// Custom morgan for POST method
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5325235"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.send('<p>No info found</p>')
    response.status(404).end()
  }
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})