import React from 'react'

const Notification = ({ message }) => {
    if(!message) {
        return <div></div>
    }
    return(
        <div style={{color: 'red', padding: '20px', fontSize: '25px'}} >
            {message}
        </div>
    )
}

export default Notification