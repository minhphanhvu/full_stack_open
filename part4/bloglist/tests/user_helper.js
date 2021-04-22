const User = require('../models/user')

const initialUsers = [
  {
    username: "test",
    name: "test",
    password: "password"
  },
  {
    username: "Alice",
    name: "Alice Wonderland",
    password: "Pass1234"
  },
  {
    username: "Robbert",
    name: "Robbert",
    password: "Pass1234"
  },
  {
    username: "Joseph",
    name: "Joseph Vu",
    password: "Pass1234"
  },
]

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

module.exports = {
  usersInDb,
  initialUsers
}
