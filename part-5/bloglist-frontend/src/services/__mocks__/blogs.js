let token = null

const blogs = [
{
    id: "5b1e25915f55d70a16d3f961",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 15,
    user: {
        _id: "5b1e256a5f55d70a16d3f960",
        username: "mnajarian",
        name: "Mahdi Najjarian"
    }
},
{
    id: "5b1e25ff5f55d70a16d3f962",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 16,
    user: {
        _id: "5b1e256a5f55d70a16d3f960",
        username: "mnajarian",
        name: "Mahdi Najjarian"
    }
},
{
    id: "5b1e26425f55d70a16d3f963",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 9,
    user: {
        _id: "5b1e256a5f55d70a16d3f960",
        username: "mnajarian",
        name: "Mahdi Najjarian"
    }
},
{
    id: "5b1e26915f55d70a16d3f964",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 16,
    user: {
        _id: "5b1e256a5f55d70a16d3f960",
        username: "mnajarian",
        name: "Mahdi Najjarian"
    }
},
{
    id: "5b1e272c5f55d70a16d3f966",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 1,
    user: {
        _id: "5b1e26d25f55d70a16d3f965",
        username: "root",
        name: "root"
    }
},
{
    id: "5b1e27545f55d70a16d3f967",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 10,
    user: {
        _id: "5b1e26d25f55d70a16d3f965",
        username: "root",
        name: "root"
    }
}
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
    return
}

export default { getAll, blogs, setToken }