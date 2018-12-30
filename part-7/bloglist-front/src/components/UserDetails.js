import React from 'react'
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap'

const UserDetails = ({ user }) => {
  if(user.name) {
    return(
      <div>
        <Card>
          <CardHeader>{user.name}</CardHeader>
          <CardBody>
            <CardTitle>Added blogs</CardTitle>
            <ul >
              {user.blogs.map(blog =>
                <li key={blog._id}>{blog.title}</li>
              )}
            </ul>
          </CardBody>
        </Card>
      </div>
    )
  } else {
    return <div></div>
  }
}
export default UserDetails