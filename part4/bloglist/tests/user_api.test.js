const { TestScheduler } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./user_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let newUser = new User(user)
    await newUser.save()
  }
})

describe('get all users succesfully', () => {
  test('successfully extract all users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('all users do not have passwords returned', async () => {
    const response = await api.get('/api/users')
    response.body.forEach(user => {
      expect(user.password).toBeUndefined()
    })
  })
})

describe('create a new user', () => {
  test('unsuccessfully, new user with invalid password returns status 400', async () => {
    const newUser = {
      username: 'Invalid User',
      name: 'Invalid Person',
      password: 'Pa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    expect(response.body).toEqual({ error: 'Password must be at least 3 characters longs' })
  })

  test('unsuccessfully, new user violates unqiue username constraint, but with valid password', async () => {
    const newUser = {
      username: "Minh Vu",
      name: "Minh",
      password: "Pass1234"
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body).toEqual({ error: "User validation failed: username: Error, expected `username` to be unique. Value: `Minh Vu`" })
  })

  test('successfully create a new user', async () => {
    const newUser = {
      username: "New User",
      name: "User",
      password: "Pass1234"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const users = await helper.usersInDb()
    const savedUser = users.find(user => user.username === "New User")

    expect(savedUser).toBeDefined()
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
