import express from 'express'
import { Register } from '../controllers/Auth.js'

const AuthRoutes=express.Router()


AuthRoutes.post('/register',Register)
export default AuthRoutes