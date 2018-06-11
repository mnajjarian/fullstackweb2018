const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, likes: 1 })
    res.json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    try {

        const existingUser = await User.find({ username: body.username })
        if(existingUser.length > 0) {
            res.status(400).json({ error: 'username must be unique'})
        }

        const saltRound = 10
        const passwordHash = await bcrypt.hash(body.password, saltRound)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()
        res.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        res.status(500).send({ error: 'somethings went wrong'})
    }
})

module.exports = usersRouter