import React from 'react'

const Comment = (props) => {
  return(
    <div>
      <div>
        <h3>comments</h3>
        <form onSubmit={props.submitComment} >
          <input type='text' name='comment' />
          <button type='submit' >add comment</button>
        </form>
      </div>
      <div>
        {/* <ul>
          {props.blog.comments.map(com =>
            <li key={com._id}>{com.comment}</li>
          )}
        </ul> */}
      </div>
    </div>
  )
}
export default Comment