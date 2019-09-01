const dummy = (blogs) => {
    return blogs.length + 1
}
  
const totalLikes = (blogs) => {
    var result = blogs.reduce((x, y) => x + y.likes, 0)
    return result
}
  
const favoriteBlog = (blogs) => {
    const sortBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return {
        title: sortBlogs[0].title,
        author: sortBlogs[0].author,
        likes: sortBlogs[0].likes
    }
}
  
const mostBlogs = (blogs) => {
    const groupBy = blogs.reduce((acc, arr) => {
        if(!acc.map(m => m.author).includes(arr.author)) {
            acc.push({ author: arr.author, blogs: 1 })
        } else {
            var fill = acc.filter(f => f.author === arr.author)
            fill[0].blogs += 1
        }
        return acc
    }, [])
  
    return groupBy.sort((a, b) => b.blogs - a.blogs)[0]
}
  
const mostLikes = (blogs) => {
    const groupBy = blogs.reduce((acc, arr) => {
        if(!acc.map(m => m.author).includes(arr.author)) {
            acc.push({ author: arr.author, likes: arr.likes })
        } else {
            var fill = acc.filter(f => f.author === arr.author)
            fill[0].likes += arr.likes
        }
        return acc
    }, [])
    return groupBy.sort((a, b) => b.likes - a.likes)[0]
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}