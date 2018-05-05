import React from 'react'

const Search = ({filter, handleFilterChange}) => {
    return(
        <div>
            find name: <input value={filter} onChange={handleFilterChange} />
        </div>
    )
}

export default Search