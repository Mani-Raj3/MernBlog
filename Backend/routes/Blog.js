// import express from 'express'
// import cors from "cors";
// import { Create, Update, deletePost, getAllBlogs, getSingleBlog } from '../controllers/Blog.js'
// //import { isAdmin } from '../middleware/isAdmin.js'
// import  {isLogin}  from '../middleware/isLogin.js'

// import { postUpload } from "../middleware/Multer.js";

// const BlogsRoutes=express.Router()
// BlogsRoutes.get("/", getAllBlogs);                  // Get all blogs
// BlogsRoutes.get("/:id", getSingleBlog);             // Get one blog
// BlogsRoutes.post('/create',isLogin,postUpload.single('postimage'),Create)
// BlogsRoutes.patch('/update/:id',isLogin,postUpload.single('postimage'),Update)
// BlogsRoutes.delete('/delete/:id',isLogin,deletePost)
// export default BlogsRoutes


import express from "express";

import {
  Create,
  Update,
  deletePost,
  getAllBlogs,
  getSingleBlog,
} from "../controllers/Blog.js";

import { isLogin } from "../middleware/isLogin.js";

import { postUpload } from "../middleware/Multer.js";

const BlogsRoutes = express.Router();


// =====================================================
// GET ALL BLOGS
// =====================================================

BlogsRoutes.get(
  "/",
  getAllBlogs
);


// =====================================================
// GET SINGLE BLOG
// This also increases views by 1
// =====================================================

BlogsRoutes.get(
  "/:id",
  getSingleBlog
);


// =====================================================
// CREATE BLOG
// =====================================================

BlogsRoutes.post(
  "/create",
  isLogin,
  postUpload.single("postimage"),
  Create
);


// =====================================================
// UPDATE BLOG
// =====================================================

BlogsRoutes.patch(
  "/update/:id",
  isLogin,
  postUpload.single("postimage"),
  Update
);


// =====================================================
// DELETE BLOG
// =====================================================

BlogsRoutes.delete(
  "/delete/:id",
  isLogin,
  deletePost
);


export default BlogsRoutes;