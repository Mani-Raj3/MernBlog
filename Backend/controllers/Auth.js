import UserModel from "../models/user.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

const Register = async (req, res) => {
    try {
        //  const {FullName,email,password}=req.body

        const FullName = req.body.FullName;
        const email = req.body.email;
        // const password = req.body.password || req.body["password "];


        const password = req.body.password || req.body["password "];

        const hasepassword = await bcryptjs.hash(password, 10);


        const exitUser = await UserModel.find({ email })
        if (!exitUser) {
            return res.status(303).json({ success: false, message: "User already Exist Please Login" })
        }
        const imagePath = req.file.filename

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
        return res.status(200).json({ success: true, message: "User Register Successfully", User: NewUser })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }

}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
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

        res.status(200).json({ success: true, message: "Login successfully", user: FindUser, token })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const Logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({ success: true, message: "Logout Successfullyyyy" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" })

    }
}



export { Register, Login, Logout }