
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      trim: true,
    },

    desc: {
      type: String,
    },

    image: {
      type: String,
    },

    // Number of times the post has been opened
    views: {
      type: Number,
      default: 0,
    },

    added_by: {
      type: String,
    },

    updated_by: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;