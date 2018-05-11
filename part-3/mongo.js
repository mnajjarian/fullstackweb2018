const mongoose = require('mongoose')

const url = 'mongodb://<user>:<pass>@ds119080.mlab.com:19080/fullstackweb-phonebook'

mongoose.connect(url)

const Person = mongoose.model('People', {
  name: String,
  number: String
})

if(process.argv.length > 2) {

  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  person
    .save()
    .then(() => {
      console.log(`a person ${process.argv[2]} with number ${process.argv[3]} has been added to the list`)
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(response => {
      console.log('phone book:')
      response.forEach(p => {
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
    })
}

