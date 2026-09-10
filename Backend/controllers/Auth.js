import UserModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

const Register = async (req, res) => {
    try {
        const FullName = req.body.FullName?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!FullName || !email || !password) {
            return res.status(400).json({ success: false, message: "Full name, email and password are required." });
        }

        const hasepassword = await bcryptjs.hash(password, 10);

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists. Please log in." });
        }
        const imagePath = req.file?.filename || "";

        // const hasepassword=await bcryptjs.hashSync(password,10)
        //  const hashedPassword = await bcryptjs.hash(password, 10);



        // const NewUser= new UserModel({
        //     FullName,email,password,profile:imagePath
        // Commentssssssssssssssssss
        // -->>yaha pe password ka value dene ke baad hi password print hua h aise nhi jo rha tha 

        //     const NewUser = new UserModel({
        // FullName,
        // email,
        // // password: "12345",
        //   password:hasepassword,
        // profile: imagePath
        //     })

        //-->> yaha pe password ka value assign v nhi krenge to fr hase ho jyga but uske pehle  
        //       const FullName = req.body.FullName;
        // const email = req.body.email;   ----- ye line ko change krna hoga 

        const NewUser = new UserModel({
            FullName,
            email,
            password: hasepassword,
            profile: imagePath
        });

        await NewUser.save()
        return res.status(201).json({ success: true, message: "User registered successfully", user: NewUser })
    }
    catch (error) {
        console.log(error)
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: "User already exists. Please log in." });
        }
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

}


const Login = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required " });

        }
        const FindUser = await UserModel.findOne({ email })

        if (!FindUser) {
            return res.status(400).json({ success: false, message: "No User Found please Register " });
        }

        const comparepassword = await bcryptjs.compare(password, FindUser.password)

        if (!comparepassword) {
            return res.status(400).json({ success: false, message: "Invalid Password " });
        }

        const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECREATE)
        //  res.cookie('token',token,{
        //     httpOnly:true,
        //     secure: false,
        //     maxAge: 4* 24 * 60 * 1000
        //  })

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 4 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const Logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        })
        res.status(200).json({ success: true, message: "Logout Successfullyyyy" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })

    }
}



export { Register, Login, Logout }
