import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    // null = normal comment
    // ObjectId = reply to another comment
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = mongoose.model(
  "Comment",
  commentSchema
);

export default CommentModel;