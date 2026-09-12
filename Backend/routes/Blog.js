import express from 'express'
import cors from "cors";
import { Create, Update, deletePost, getAllBlogs, getSingleBlog } from '../controllers/Blog.js'
//import { isAdmin } from '../middleware/isAdmin.js'
import {   isLogin } from '../middleware/isLogin.js'

import { postUpload } from "../middleware/Multer.js";

const BlogsRoutes=express.Router()
BlogsRoutes.get("/", getAllBlogs);                  // Get all blogs
BlogsRoutes.get("/:id", getSingleBlog);             // Get one blog
BlogsRoutes.post('/create',isLogin,postUpload.single('postimage'),Create)
BlogsRoutes.patch('/update/:id',isLogin,postUpload.single('postimage'),Update)
BlogsRoutes.delete('/delete/:id',isLogin,deletePost)
export default BlogsRoutes
