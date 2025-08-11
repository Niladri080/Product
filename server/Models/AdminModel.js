import mongoose from "mongoose";
const AdminSchema=new mongoose.Schema({
  image:{type:String,required:true},
  name:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:Number,required:true},
  address:{type:String,required:true},
  password:{type:String,required:true},
  orders:{type:Number,default:0},
  products:{type:Number,default:0},
  revenue:{type:Number,default:0},
  createdAt:{type:Date,default:Date.now}
})
export const Admin=mongoose.model("admin",AdminSchema);