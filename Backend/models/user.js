import mongoose from "mongoose";
const UserSchema= new mongoose.Schema({
     FullName:{
        type:String,
     },
     email:{
        type:String,
        unique:true,
        required:true,
     },
     profile:{
        type:String,
     },
     password:{
        type:String,
        required:true,
     },
     role:{
        type:String,
        enum:['admin','user'],
        default:'user'
     }
},{timestamps:true })

const UserModel= mongoose.model("users",UserSchema)
export default UserModel
