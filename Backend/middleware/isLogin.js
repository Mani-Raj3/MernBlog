import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const isLogin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User!"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECREATE);

        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export { isLogin };
