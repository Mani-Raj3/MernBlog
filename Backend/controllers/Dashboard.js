import UserModel from "../models/user.js";
import BlogModel from "../models/Blog.js";
import CommentModel from "../models/Comments.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await UserModel.countDocuments();
        const totalPosts = await BlogModel.countDocuments();
        const totalComments = await CommentModel.countDocuments();

        res.status(200).json({
            success: true,
            totalUsers,
            totalPosts,
            totalComments
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to get dashboard statistics"
        });
    }
};