const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 6
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(Blog.format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
}


module.exports = {
    initialBlogs, blogsInDb, usersInDb
}