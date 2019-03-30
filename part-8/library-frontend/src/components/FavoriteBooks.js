import React from 'react'

const Favorite = (props) => {
    if(!props.show) {
        return null
    }
    if(props.user.loading || props.result.loading) {
        return <div>loading...</div>
    }
    const genre = props.user.data.loggedUser.favoriteGenre
    const books = props.result.data.allBooks.filter(b => b.genres.includes(genre))
    return(
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <span style={{fontWeight: 'bold'}} >{genre}</span></p>
            <table>
                <tbody> 
                    <tr>
                        <th>book</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map(b => 
                    <tr key={b.id}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Favorite