import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export const Allpost = () => {
  return (
    <> <div className='container'>
     <h1 className="text-center mb-4 text-white">All Posts</h1>
     <div className="row">
      <div className='col-md-4 mb-4 col-lg-4 col-12'>

     <div className="card h-100">
      <img src="https://plus.unsplash.com/premium_photo-1676499654686-47fb4412f18a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className="card-body">
        <h5 className="card-title">My First Blog</h5>
        <p className="card-text">This is my first Blog</p>
      </div>


      <div className="card-footer d-flex justify-content-between">
        <button
          className="btn btn-danger"
          >
         <FaTrashAlt/> Delete
        </button>
        <button
          className="btn btn-warning"
          >
         <FaEdit/> Update
        </button>
      </div>

     </div>
      </div>
   



    
    {/* // -->>  Aise me kitna v post create kr skte h  */}
      

     </div>
    </div>
    </>
    
  )
}
