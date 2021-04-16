const http = require('http')
const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')
const Blog = require('./models/blog')
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

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
