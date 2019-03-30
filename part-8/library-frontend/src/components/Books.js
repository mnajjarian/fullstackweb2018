import React, { useState } from 'react'

const Books = (props) => {
  const[genre, setGenre] = useState('all')
  if (!props.show) {
    return null
  }
  if(props.result.loading) {
    return <div>loading...</div>
  }


  const list = ['all']
  props.result.data.allBooks.map(g => {
    return g.genres.forEach(g => {
      if(!list.includes(g)) {
        list.push(g)
      }
    })
  })

const books = genre !== 'all' ? 
        props.result.data.allBooks.filter(book => book.genres.includes(genre)) 
        : props.result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
          )}
        </tbody>
      </table>
      <div>
        {list.map(g => 
          <button key={g} onClick={() => setGenre(g)} >{g}</button>
        )}
      </div>
    </div>
  )
}

export default Books