import React from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleChange, title, author, url}) => {
    return(
        <div>
            <h2>Create new</h2>
            <form onSubmit={onSubmit} >
            <div>
               Title:
               <input 
               type='text'
               name='title'
               value={title}
               onChange={handleChange}
               />
            </div>
            <div>
                Author:
                <input 
                type='text'
                name='author'
                value={author}
                onChange={handleChange}
                />
            </div>
            <div>
                Url:
                <input
                type='text'
                name='url'
                value={url}
                onChange={handleChange}
                />
            </div>
            <button type='submit' >create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    onSubmit: propTypes.func.isRequired,
    handleChange: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    url: propTypes.string.isRequired
}

export default BlogForm