import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap'

const UsersList = ({ users, handleUser }) => {
  return(
    <div>
      <Breadcrumb>
        <BreadcrumbItem><Link to='/' >blogs</Link></BreadcrumbItem>
        <BreadcrumbItem active>users</BreadcrumbItem>
      </Breadcrumb>
      <h2>users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs added</th>
          </tr>
          {users.map(user =>
            <tr key={user.id} >
              <td onClick={handleUser(user.id)} ><a href={`/${user.id}`} >{user.name}</a></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList