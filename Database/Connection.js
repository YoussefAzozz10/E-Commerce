import mongoose from "mongoose";

const connection = async()=>{

    return await mongoose.connect(process.env.DB_URL).then(result=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.log('Error in connecting to DB');
    })
}

export default connection;