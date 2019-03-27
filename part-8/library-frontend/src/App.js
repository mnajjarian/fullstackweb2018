import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR } from './types'




const App = () => {
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const addBook = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })
  const editAuthor = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        result={allAuthors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={allBooks}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

    </div>
  )
}

export default App
