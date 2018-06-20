import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return(
        <div>
            <h2>Log in to application</h2>

            <form onSubmit={handleSubmit} >
                <div>
                    username:
                    <input
                    value={username}
                    onChange={handleChange}
                    name='username'
                    />
               </div>
               <div>
                   password:
                   <input
                   type='password'
                   value={password}
                   onChange={handleChange}
                   name='password' />
               </div>
               <button type='submit' >login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: propTypes.func.isRequired,
    handleChange: propTypes.func.isRequired,
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired
}

export default LoginForm