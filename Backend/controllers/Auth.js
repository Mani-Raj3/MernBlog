import UserModel from "../models/user"


const Register=async(req,res)=>{
     try {
        const{fullName, email,password}=req.body

        const exitUser=await UserModel.find({email})
        if(!existUser){
            return res.status(303).json({success:false,message:"User already Exist Please Login"})
        }
        const NewUser= new UserModel({
            FullName,email,password
        })
        await NewUser.save()
           return res.status(200).json({success:true,message:"User Register Successfullyyy",user:NewUser})

     } catch (error) {
        console.log(error)
           return res.status(500).json({success:false,message:"Internal Server error"})
        
     }
}

export {Register}