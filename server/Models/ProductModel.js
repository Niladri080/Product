import mongoose, { mongo } from "mongoose";
const ProductSchema=new mongoose.Schema({
  image:{type:String,required:true},
  admin_id:{type:mongoose.Schema.Types.ObjectId,ref:'Admin',required:true},
  admin_name:{type:String,required:true},
  type:{type:String,required:true},
  name:{type:String,required:true},
  price:{type:Number,required:true},
  description:{type:String,required:true},
  createdAt:{type:Date,default:Date.now},
  sales:{type:Number,default:0}
})
export const Product=mongoose.model('Product',ProductSchema);