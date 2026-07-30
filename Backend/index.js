import express from 'express'
import dotenv from 'dotenv'
import DBCon from './utils/db.js'
import AuthRoutes from './routes/Auth.js'
import cookieParser from 'cookie-parser'
import BlogsRoutes from './routes/Blog.js'
dotenv.config()
const PORT=process.env.PORT || 3000

// const app=express()

// // mongodb connection
// DBCon()
// app.use(express.json)

 const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBCon();
app.use(express.static('public'))  //-->> this line is used for accessing image on browser through image address
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Helloo from backend")
})

app.use('/auth',AuthRoutes)
app.use('/blog',BlogsRoutes)

app.listen(PORT,()=>{
    console.log(`app is running on Port ${PORT}`)
})