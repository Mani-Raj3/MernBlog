import React from 'react'
import { useNavigate } from 'react-router-dom'
export const Recentpost = () => {
 const navigate=useNavigate()
  const handlenavigate=()=>{
    navigate('/post/:025458466445')
  }

  return (
    <>
      <div className="container">
        <div className="mb-5 text-center">
          <h2 className="fw-bold text-white">Recent Post</h2>
        </div>

        <div className='row'>
             <div className='col-md-4 col-lg-4 col-xs-12 mb-4'>
                <div className="card border-success" style={{borderWidth: "2px", backgroundColor: "#2b2b2b",borderRadius:"10px",overflow:"hidden"}}>
                   <img src="https://images.unsplash.com/photo-1777661097541-e9ebeffe6aa2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className='card-img-top img-fluid' alt="" /> 
                  <div className="card-body bg-dark text-white">
                    <h5 className="card-title">My First Blog</h5>
                    <p className="card-text">This is my first blog</p>
                    <button className="btn btn-primary w-100 mt-3" onClick={handlenavigate}>Read Article</button>
                      
                  </div>
                </div>
             </div>
        </div>
      </div>

    </>
  )
}