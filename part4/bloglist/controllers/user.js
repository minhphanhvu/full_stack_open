const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    response.status(400).json({ error: 'Password must be at least 3 characters longs' })
  } else {
    const saltRounds = 10
    const password = await bcrypt.hash(body.password, saltRounds)
    const newUser = new User({
      username: body.username,
      name: body.name,
      password: password,
    })
    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter
