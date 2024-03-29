const express = require('express')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const cors = require('cors')

// Mongoose and database connection
const mongoose = require('mongoose')

logger.info('Connecting to', config.MONGODB_URI)

const mongoUrl = `${config.MONGODB_URI}`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connected to MongoDB', error.message)
  })

// Using cors and body-parser
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// Using middleware requestLogger
app.use(middleware.requestLogger)

// Using getTokenExtractor
app.use(middleware.tokenExtractor)

// Using blog router
app.use('/api/blogs', blogsRouter)
// Using user router
app.use('/api/users', usersRouter)
// Using login router
app.use('/api/login', loginRouter)

// Using middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
