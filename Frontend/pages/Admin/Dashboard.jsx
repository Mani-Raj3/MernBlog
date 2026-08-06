import React from 'react'

export const Dashboard = () => {
  return (
    <>
    <div>
      <h2 className="mb-4 text-white">Dashboard</h2>
      <div className='row'>
        <div className='col-md-4 col-lg-4 col-sm-4 co-12'>
          <div className="card bg-primary text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
               <p className="card-text">0</p>
            </div>
          </div>
        </div>
      
       <div className='col-md-4 col-lg-4 col-sm-4 co-12'>
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Post</h5>
               <p className="card-text">0</p>
            </div>
          </div>
        </div>
      
       <div className='col-md-4 col-lg-4 col-sm-4 co-12'>
          <div className="card bg-warning text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Comments</h5>
               <p className="card-text">0</p>
            </div>
          </div>
        </div>


      </div>
    </div>
    </>
  )
}
