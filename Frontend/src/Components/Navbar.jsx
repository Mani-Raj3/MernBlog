import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    const [islogin,setIslogin]=useState(true)
// const [islogin,setIslogin]=useState(false) -->> yaha true hoga to user login h agr flase hoga to login nhi h 
  return (
   <>
   <nav className="navbar d-flex justify-content-between align-items-center p-3 ">
 <Link to={'/'}>    <h1 className="mx-5 text-white fs-2 fw-bold">Code My Maniii</h1></Link>
 <div className="d-flex align-item-center">
    {!islogin}
  
  
  {!islogin ?   <Link to={'/login'}><button className="btn_sign mx-3">Sign in</button></Link> :(
    
  <div className="dropdown">
    <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{width:'40px', height:'40px', cursor:"pointer"}}>
    <img src="https://plus.unsplash.com/premium_vector-1683141132250-12daa3bd85cf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " 
   className='img-fluid h-100 w-100' 
   style={{objectFit:"cover"}} alt="" />
    </div>

   <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">

    <li><Link className= "dropdown-item" to="/dashboard">Dashboard</Link></li>
   <li><Link className= "dropdown-item" to={'/profile/9898984'}>Profile</Link></li>
   <li><a className= "dropdown-item" style={{cursor:"pointer"}}>sign out</a></li>
    

   </ul>


  </div>

  )}

{/* 
  <div className="dropdown">
    <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{width:'40px', height:'40px', cursor:"pointer"}}>
    <img src="https://plus.unsplash.com/premium_vector-1683141132250-12daa3bd85cf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D " 
   className='img-fluid h-100 w-100' 
   style={{objectFit:"cover"}} alt="" />
    </div>

   <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">

    <li><Link className= "dropdown-item" to="/dashboard">Dashboard</Link></li>
   <li><Link className= "dropdown-item" to={'/profile/9898984'}>Profile</Link></li>
   <li><a className= "dropdown-item" style={{cursor:"pointer"}}>sign out</a></li>
    

   </ul>


  </div> */}

 </div>
   </nav>
   </>
  )
}
