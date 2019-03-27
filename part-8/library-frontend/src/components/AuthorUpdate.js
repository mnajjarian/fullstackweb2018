import React, { useState } from 'react'
import Select from 'react-select'


const AuthorUpdate = (props) => {
    const [born, setBorn] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: '20'
        }),
    }

    const options = []
    props.authors.map(author => 
            options.push({
                value: author.name, label: author.name
            })
            
        )
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
    }
    const submit = async (e) => {
        e.preventDefault()
        await props.editAuthor({
            variables: { name: selectedOption.value, born}
        })
        setSelectedOption('')
        setBorn('')
    }
    return(
        <div>
            <h2>Set Birthday</h2>
            <div>
                <form onSubmit={submit} >
                    <Select 
                        value={selectedOption} 
                        onChange={handleChange}
                        options={options}
                        styles={customStyles}
                        />
                    <div>
                        born: <input type="number" value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
                    </div>
                    <button>Update Author</button>
                </form>
            </div>
        </div>
    )
}

export default AuthorUpdate