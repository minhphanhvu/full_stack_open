const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
  {
    username: 'test',
    name: 'test',
    password: 'password'
  },
  {
    username: 'test 2',
    name: 'Alice Wonderland',
    password: 'password'
  },
  {
    username: 'Robbert',
    name: 'Robbert',
    password: 'Pass1234'
  },
  {
    username: 'Joseph',
    name: 'Joseph Vu',
    password: 'Pass1234'
  },
]

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

const generateFirstUserToken = async () => {
  const res = await api
    .post('/api/login')
    .send({
      username: 'test',
      password: 'password'
    })

  return res.body.token
}

module.exports = {
  usersInDb,
  initialUsers,
  generateFirstUserToken
}
