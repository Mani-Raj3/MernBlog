// import UserModel from "../models/user"
import UserModel from "../models/user.js";


const Register=async(req,res)=>{
     try {
        const{FullName, email,password}=req.body

        const exitUser=await UserModel.find({email})
        if(!exitUser){
            return res.status(303).json({success:false,message:"User already Exist Please Login"})
        }
        const NewUser= new UserModel({
            FullName,email,password
        })
        await NewUser.save()
           return res.status(200).json({success:true,message:"User Register Successfullyyy",user:NewUser})

     } catch (error) {
        console.log(error)
           return res.status(400).json({success:false,message:"Internal Server error"})
        
     }
}

export {Register}