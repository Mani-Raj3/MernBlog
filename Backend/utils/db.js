import mongoose from "mongoose";

const DBCon=async()=>{
    try {
        // mongoose.connect(process.env,MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Mongodb is connected')
    } catch (error) {
        console.log('mongodb error',error)
        
    }
}

export default DBCon


// import mongoose from "mongoose";

// const DBCon = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL);
//     console.log("MongoDB is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default DBCon;