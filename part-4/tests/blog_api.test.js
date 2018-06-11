const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

describe('when there is initially some notes saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObject.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('all blogs are returned', async () => {
        const blogsInDb = await helper.blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)


        expect(response.body.length).toBe(blogsInDb.length)
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/'
        }

        const blogsAtStart = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body.length).toBe(blogsAtStart.length + 1)
        expect(contents).toContain('React patterns')
    })

    describe('deletion of a blog', async () => {
        let addedBlog

        beforeAll(async () => {
            addedBlog = new Blog({
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
            })
            await addedBlog.save()
        })

        test('DELETE /api/notes/:id succeeds with proper statuscode', async () => {
            const blogsAtStart = await helper.blogsInDb()

            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)

            const blogsAfterOperation = await helper.blogsInDb()

            const titles = blogsAfterOperation.map(r => r.title)
            expect(titles).not.toContain(addedBlog.title)
            expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)

        })
    })

    test('edit a single blog', async () => {
        const blogsInDb = await helper.blogsInDb()
        const blogBeforeEdit = blogsInDb[0]

        const blogsAfterEdit = { ...blogBeforeEdit, likes: 9 }

        await api
            .put(`/api/blogs/${blogsAfterEdit.id}`)
            .send(blogsAfterEdit)
            .expect(200)

        const response = await helper.blogsInDb()

        expect(response[0].likes).toBe(blogsAfterEdit.likes)
    })

    test('likes value set to 0', async () => {
        const blogsInDb = await helper.blogsInDb()

        const changedBlogs = blogsInDb.reduce((acc, arr) => {
            if(arr.likes === undefined) {
                acc.push({ ...arr, likes: 0 })
            } else {
                acc.push(arr)
            }
            return acc
        }, [])

        await Blog.remove({})

        const blogObject = changedBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObject.map(blog => blog.save())
        await Promise.all(promiseArray)

        const response = await api
            .get('/api/blogs')

        const likes = response.body.map(r => r.likes)
        expect(likes.length).toBe(response.body.length)
    })

    test('blogs not added whitout title or url', async () => {
        const newBlog = {
            likes: 5
        }

        const blogsInDb = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(blogsInDb.length)
    })

    describe('when there is initially one user at db', async () => {
        beforeAll(async () => {
            await User.remove({})

            const user = new User({ username: 'root', password: 'secret', adult: true })
            await user.save()
        })

        test('POST /api/users succeeds with a fresh username', async () => {
            const usersBeforeOperation = await helper.usersInDb()

            const newUser = {
                username: 'mnajarian',
                name: 'Mahdi Najjarian',
                adult: true,
                password: 'fullpower'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAfterOperation = await helper.usersInDb()
            expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)

            const usernames = usersAfterOperation.map(r => r.username)
            expect(usernames).toContain(newUser.username)
        })

        test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
            const usersBeforeOperation = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'super user',
                adult: true,
                password: 'fullpower'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body).toEqual({ error: 'username must be unique' })

            const usersAfterOperation = await helper.usersInDb()
            expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
        })

        test('POST /api/users fails with proper statuscode and message if password is less than 3 characters', async () => {
            const usersBeforeOperation = await helper.usersInDb()

            const newUser = {
                username: 'username',
                name: 'name',
                adult: false,
                password: 'po'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body).toEqual({ error: 'the password must be at least 3 characters' })

            const usersAfterOperation = await helper.usersInDb()
            expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
        })
    })

    afterAll(() => {
        server.close()
    })
})