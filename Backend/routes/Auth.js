import express from 'express'
import { DeleteUser, GetAllUsers, Login, Logout, Register } from '../controllers/Auth.js'
import upload from '../middleware/Multer.js'
import { isLogin } from '../middleware/isLogin.js'

const AuthRoutes=express.Router()

AuthRoutes.post('/register',upload.single('profile'),Register)
AuthRoutes.post("/login",Login)
AuthRoutes.post('/logout',Logout)
AuthRoutes.get('/users', isLogin, GetAllUsers)
AuthRoutes.delete('/users/:id', isLogin, DeleteUser)
export default AuthRoutes
