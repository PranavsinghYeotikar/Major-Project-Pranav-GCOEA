import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "fyp_management-system",

    }).then(()=>{
        console.log("Connected to database.");
    })
    .catch((err)=>{
        console.log("Connection failed.", err);
    })
}