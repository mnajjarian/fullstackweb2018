import React from 'react'

const Filter = ({persons, filter, handleDelete}) => {
    const showFilterName = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    return(
        <div>
        <h2>Numbers</h2>
        {showFilterName.map(p => <div key={p.name}>{p.name} {p.number} <button onClick={handleDelete(p.id, p.name)} >delete</button></div>)}
        </div>
    )
}

export default Filter