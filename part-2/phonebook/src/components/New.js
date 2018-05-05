import React from 'react'

const New = ({newName, newNumber, addName, handleNameChange, handleNumberChange}) => {
    return(
        <div>
            <h2>Add new contact</h2>
        <form>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit" onClick={addName} >add</button>
          </div>
        </form>
        </div>
    )
}

export default New