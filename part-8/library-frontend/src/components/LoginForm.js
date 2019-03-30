import React, { useState } from 'react'

const LoginForm = (props) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        const result = await props.login({
            variables: { username, password }
        })
        const token = result.data.login.value
        localStorage.setItem('library-token', token)
        props.setToken(token)

    }
    return(
        <div>
            <h2>Library</h2>
            <form onSubmit={submit} >
                <div>
                    username: <input type='text' value={username} onChange={({target}) => setUsername(target.value)} />
                </div>
                <div>
                    password: <input type={password} value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm