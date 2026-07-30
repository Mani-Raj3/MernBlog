import express from 'express'
import { Create, deletePost, getAllBlogs, getSingleBlog } from '../controllers/Blog.js'
//import { isAdmin } from '../middleware/isAdmin.js'
import {   isLogin } from '../middleware/isLogin.js'

import upload from "../middleware/Multer.js";

const BlogsRoutes=express.Router()
BlogsRoutes.get("/", getAllBlogs);                  // Get all blogs
BlogsRoutes.get("/:id", getSingleBlog);             // Get one blog
BlogsRoutes.post('/create',isLogin,upload.single('postimage'),Create)
BlogsRoutes.delete('/delete/:id',isLogin,deletePost)
export default BlogsRoutes