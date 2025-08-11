import mongoose from "mongoose";
export const connectDB=async ()=>{
  try{
    const MONGODB_URI =
      "mongodb+srv://nilmandal098:Niladri123@cluster1.fodzwrn.mongodb.net/Product";
      await mongoose.connect(MONGODB_URI).then (()=>{
        console.log("Database connected");
      })
  } catch(error){
    console.log("Error occured",error.message);
  }
}