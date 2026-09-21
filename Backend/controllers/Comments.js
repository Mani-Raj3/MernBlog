import mongoose from "mongoose";
import CommentModel from "../models/Comments.js";

 const createComment = async (req, res) => {

  try {
    console.log("========== CREATE COMMENT ==========");

    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("User:", req.user);

    const { postId } = req.params;
    const { comment } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    const newComment = await CommentModel.create({
      postId: postId,
      userId: req.user._id,
      comment: comment.trim(),
    });

    console.log("Comment saved:", newComment);

    return res.status(201).json({
      success: true,
      message: "Comment submitted successfully",
      comment: newComment,
    });

  } catch (error) {
    console.log("CREATE COMMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const replyComment = async (req, res) => {

  try {
    console.log("========== REPLY COMMENT ==========");

    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("User:", req.user);

    const { commentId } = req.params;
    const { comment } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }
    //get commentID here 
    const parentComment = await CommentModel
              .findById(commentId);

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    const replyComments = await CommentModel.create({
      postId: parentComment.postId,
      userId: req.user._id,
      parentCommentId:commentId,
      comment: comment.trim(),
    });

    console.log("Comment saved:", replyComments);

    return res.status(200).json({
      success: true,
      message: "reply submitted successfully",
      comment: replyComments,
    });

  } catch (error) {
    console.log("CREATE Reply ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 const getComments = async (req, res) => {
  try {

    const { postId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;


    const comments = await CommentModel.aggregate([

      // 1. Get only main comments
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId),
          parentCommentId: null
        }
      },

      // 2. Latest comments first
      {
        $sort: {
          createdAt: -1
        }
      },

      // 3. Pagination
      {
        $skip: skip
      },

      {
        $limit: limit
      },

      // 4. Get replies
      {
        $lookup: {
          from: "comments",

          localField: "_id",

          foreignField: "parentCommentId",

          as: "replies"
        }
      }

    ]);


    const totalComments = await CommentModel.countDocuments({
      postId,
      parentCommentId: null
    });


    res.status(200).json({

      success: true,

      comments,

      currentPage: page,

      totalPages: Math.ceil(
        totalComments / limit
      ),

      totalComments

    });

  } catch (error) {

    console.log(
      "Get comments error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get comments"
    });

  }
};
//  const getComments = async (req, res) => {
//   try {
//     const { postId } = req.params;

//     const page = parseInt(req.query.page) || 1;
//     const limit = 5;//parseInt(req.query.limit) || 5;

//     const skip = (page - 1) * limit;

//     const comments = await CommentModel.find({
//       postId,
//       parentCommentId: null
//     })
//       .populate("userId", "FullName email")
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const totalComments = await CommentModel.countDocuments({
//       postId,
//       parentCommentId: null
//     });

//     res.status(200).json({
//       success: true,
//       comments,
//       currentPage: page,
//       totalPages: Math.ceil(totalComments / limit),
//       totalComments
//     });

//   } catch (error) {
//     console.log("Get comments error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to get comments"
//     });
//   }
// };

export {createComment, getComments, replyComment};