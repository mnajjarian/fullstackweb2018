const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/Comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate('comments', {comment: 1 })
        .populate('user', { username: 1, name: 1 })
    res.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        .populate('comments', { comments: 1 })
        if(blog) {
            res.json(Blog.format(blog)) 
        }
        res.status(404).end()
    } catch (exception) {
        console.log(exception)
        res.status(400).send({ error: 'malformatted id '})
    } 
})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)

        console.log(decodedToken)

        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        if(body.title === undefined) {
            res.status(400).json({ error: 'title missing' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            id: body._id,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    
        res.json(Blog.format(savedBlog))
    } catch (exception) {
   
        if (exception.name === 'JsonWebTokenError' ) {
            res.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            res.status(500).json({ error: 'something went wrong...' })
        }
    }    
})

blogsRouter.put('/:id', (req, res) => {
    
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog
        .findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedBlog => {
            res.json(Blog.format(updatedBlog))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

blogsRouter.post('/:id/comments', async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const blog = await Blog.findById(req.params.id)
        const comment = new Comment({
            comment: body.comment,
            blog: req.params.id
        })
        
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

    } catch (error) {
        console.log(error)
    }


})

blogsRouter.delete('/:id', async (req, res) => {
    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        
        const blog = await Blog.findById(req.params.id)
        const userid = decodedToken.id

        if (blog.user.toString() !== userid.toString()) {
            res.status(409).send({ error : 'operation not permitted'})
        } else {
            await Blog.findByIdAndRemove(req.params.id)

            res.status(204).end()
        }  
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            res.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            res.status(400).send({ error: 'malformatted id'})
        }
        
    }
})
    
module.exports = blogsRouter