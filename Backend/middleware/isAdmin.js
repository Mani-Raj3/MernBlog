import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js';

const isAdmin=async(req,res,next)=>{
    try {
        const token= req.cookies.token
         console.log('token',token)
        if(!token){
            return res.status(401).json({message: 'Unauthorized: No token provided'});
        }

        const decoded= jwt.verify(token,process.env.JWT_SECREATE)

        const user= await UserModel.findById(decoded.userId)

        // console.log(decoded) -->> this is used for generating ID-- 
        // { userId: '6a61dced7e48b3407d761858', iat: 1784826124 }
      //    { userId: '6a61dced7e48b3407d761858', iat: 1784826124 }


      // Ans this console.log(finduser) is used to print the user info 
//        {
//   _id: new ObjectId('6a61dced7e48b3407d761858'),
//   FullName: 'mani raj',
//   email: 'mani255446@gmail.com',
//   profile: '1784798445284-.jpeg',
//   password: '$2b$10$1eTa7l6G7n6JtAg0kfAuW.vKzLXktwZZKtDEVZE0KMsM5S5BBzxdC',
//   role: 'user',
//   createdAt: 2026-07-23T09:20:45.415Z,
//   updatedAt: 2026-07-23T09:20:45.415Z,
//   __v: 0
// }

       //  console.log(FindUser)

     console.log("User Role =", user.role);
 console.log(user);



       if(!user){
        return res.status(403).json({success:false, message: 'unauthorized: User not found'});
       }

       if(user.role != 'admin'){
        return res.status(403).json({success:false,message: 'Unauthorized: user is not an Admin'});
       }

       next()

    } catch (error) {
         console.log(error)
     return res.status(500).json({success:false,message:"Internal server error"})
   
    }
}

export {isAdmin}