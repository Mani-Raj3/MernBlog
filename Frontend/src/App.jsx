import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Home } from '../pages/Home' 
import { Post } from '../pages/Post' 
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Profile } from '../pages/Profile'
import { UserLayout } from './Layouts/UserLayout'
import { AdminLayout } from './Layouts/AdminLayout'
import { Dashboard } from '../pages/Admin/Dashboard'
import { Addpost } from '../pages/Admin/Addpost'
import { User } from '../pages/Admin/User'
import { Allpost } from '../pages/Admin/Allpost'
export default function App() {
  return (
 <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<UserLayout/>}>
  <Route index element={<Home/>}/>
   <Route path='post/:id' element={<Post/>}></Route>
     <Route path='profile/:id' element={<Profile/>}></Route>
</Route>

<Route path='/dashboard' element={<AdminLayout/>}>
<Route index element={<Dashboard/>}/>
<Route path='addpost' element={<Addpost/>}/>
<Route path='users' element={<User/>}/>
<Route path='allposts' element={<Allpost/>}/>



</Route>
  
   {/* <Route path='/post/:id' element={<Post/>}></Route> */}
    <Route path='/login' element={<Login/>}></Route>
     <Route path='/register' element={<Register/>}></Route>
      {/* <Route path='/profile/' element={<Profile/>}></Route>   -->> ye v likh skye h */}
        {/* <Route path='/profile/:id' element={<Profile/>}></Route>    */}
        {/* or ye likh skte h isse ye pta cjlega ki user apna profile update krna chahe to kr paye */}


</Routes>
</BrowserRouter>
 </>
  )
}
