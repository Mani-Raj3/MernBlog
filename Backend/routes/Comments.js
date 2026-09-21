// import express from "express";
// import { createComment, getComments, replyComment } from "../controllers/Comments.js";
// import { isLogin} from "../middleware/isLogin.js";

// const CommentsRoutes = express.Router();

// CommentsRoutes.post("/comments/:postId",isLogin,createComment);
// CommentsRoutes.get("/comments/:postId", getComments);
// CommentsRoutes.post("/comment/reply/:commentId",isLogin,replyComment)

// export default CommentsRoutes;



import express from "express";
import { createComment, getComments, replyComment } from "../controllers/Comments.js";
import { isLogin} from "../middleware/isLogin.js";

const CommentsRoutes = express.Router();

CommentsRoutes.post("/comments/:postId",isLogin,createComment);
CommentsRoutes.get("/comments/:postId", getComments);
CommentsRoutes.post("/comment/reply/:commentId",isLogin,replyComment)

export default CommentsRoutes;