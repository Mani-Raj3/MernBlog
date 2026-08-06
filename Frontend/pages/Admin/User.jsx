import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

export const User = () => {
   const users = [
    { id: 1, name: 'Mani Raj', email: 'mani@example.com' },
    { id: 2, name: 'Mr rajj', email: 'raj@example.com' },
    { id: 3, name: 'Manish raj', email: 'manish@example.com' },
    // Add more users as needed
  ];
  const handleDelete=()=>{
    try {
      alert('user deleted Successfullyyyy')
    } catch (error) {
      
    }
  }
  return (
    <>
    <div className="container">
    <h1 className="text-white mb-4">User</h1>
      <div className='table-responsive'>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

         {users.map((user,index)=>{
          return(<tr scope='row'>
              <th>{index +1}</th>
               <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                      className="btn btn-danger"
                      onClick={handleDelete}
                      >
                   <FaTrashAlt /> Delete
                  </button>
                </td>
            </tr>)
         })}


          </tbody>
           </table>

      </div>
    </div>
    </>
  )
}
