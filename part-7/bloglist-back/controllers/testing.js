const router = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const Comment = require('../models/Comment')

router.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Comment.deleteMany({})
    res.status(204).end()
})

module.exports = router