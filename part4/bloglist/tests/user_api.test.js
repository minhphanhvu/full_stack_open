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

afterAll(async () => {
  mongoose.connection.close()
})