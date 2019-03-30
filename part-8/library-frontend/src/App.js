import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR, LOGIN, CURRENT_USER } from './types'
import LoginForm from './components/LoginForm';
import Notification from './components/Notification'
import Favorite from './components/FavoriteBooks';




const App = () => {
  const[errorMessage, setErrorMessage] = useState(null)
  const[token, setToken] = useState(localStorage.getItem('library-token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  console.log(client)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    
  }
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const addBook = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      dataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  })
  const editAuthor = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const login = useMutation(LOGIN, {
    onError: handleError
  })
  const loggedUser = useQuery(CURRENT_USER)

  const logout = () => {
    localStorage.clear()
    client.resetStore()
    setToken(null)
  }
  if(!token) {
    return(
      <LoginForm
         setToken={(token) => setToken(token)}
         login={login}
      />
    )
  }

  return (
    <div>
      <Notification
         message={errorMessage}
      />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout} >logout</button>
        <button onClick={() => setPage('favorites')} >Recomendations</button>
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

      <Favorite
         show={page === 'favorites'}
         user={loggedUser}
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
