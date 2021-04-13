const mongoose = require('mongoose')

const argvSize = process.argv.length

if (argvSize !== 5 && argvSize !== 3) {
  console.log('Please provide the correct number of arguments: node mongo.js <password> <name> <number>')
  process.exit()
}

// Process mongoose and remote mongoDB

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.6hwqo.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

// Process information

if (argvSize === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const contact = new Contact({
    name: name,
    number: number
  })
  contact.save().then(result => {
    console.log(`added ${name} number ${number} to the phonebook`)
    mongoose.connection.close()
    process.exit()
  })
} else {
  console.log('phonebook:')
  Contact
    .find({})
    .then(contacts => {
      contacts.forEach(contact => console.log(`${contact.name} ${contact.number}`))
      mongoose.connection.close()
    })
}
