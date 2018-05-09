const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())

morgan.token('type', function (req) { return JSON.stringify(req.body)})

app.use(bodyParser.json())
app.use(morgan(':method :url :type :status :res[content-length] - :response-time ms'))


let persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1},
    { name: 'Martti Tienari', number: '040-123456', id: 2},
    { name: 'Arto Järvinen', number: '040-123456', id: 3},
    { name: 'Lea Kutvonen', number: '040-123456', id: 4}
  ]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
res.send(`<p>Phonebook have ${persons.length} persons</p> ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.json(persons)
})

const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(p => p.id).sort().reverse()[0]: 0
    return maxId + 1
}
const generateNumber = () => {
    const random = Math.floor(Math.random() * (1000000 - 100000)) + 100000
    return `040-${random}`
}
app.post('/api/persons', (req, res) => {
    //const body = req.body
    const person = {
        name: 'Mahdi Najjarian',
        number: generateNumber(),
        id: generateId()
    }
    if(person.name.length < 1 || person.number.length < 10) {
        res.status(400).json({error: 'name or number is missing'})
    } else if(persons.map(p => p.name).includes(person.name)) {
        res.status(400).json({error: 'name must be unique'})
    } else {
    persons = persons.concat(person)
    res.json(persons)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})