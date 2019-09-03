import React from 'react'

const Notification =  (props) => {
  console.log(props.notify)
  if(props.notify.error !== null) {
    return(
      <div className='error' >
        {props.notify.error}
      </div>
    )
  } else if(props.notify.message !== null) {
    return(
      <div>
        <div className='message' >
          {props.notify.message}
        </div>
      </div>)
  } else {
    return( <div></div> )
  }
}

export default Notification