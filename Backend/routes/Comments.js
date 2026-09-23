import express from "express";

import {
  createComment,
  getComments,
  replyComment,
} from "../controllers/Comments.js";

import { isLogin } from "../middleware/isLogin.js";

const CommentsRoutes = express.Router();


// GET COMMENTS
CommentsRoutes.get(
  "/:slug",
  getComments
);


// CREATE COMMENT
CommentsRoutes.post(
  "/:slug",
  isLogin,
  createComment
);


// REPLY
CommentsRoutes.post(
  "/reply/:commentId",
  isLogin,
  replyComment
);


export default CommentsRoutes;
