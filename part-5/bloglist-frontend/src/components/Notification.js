import React from 'react'
import propTypes from 'prop-types'

const Notification = ({ message }) => {
    if(message === null) {
        return null
    }
    return (
        <div className='error' >
           { message }
        </div>
    )
}

Notification.prototype = {
    message: propTypes.string.isRequired
}

export default Notification