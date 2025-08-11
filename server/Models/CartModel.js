import mongoose from "mongoose";
const CartSchema=mongoose.Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  product_id:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
  quantity:{type:Number,required:true}
})
export const Cart=mongoose.model("cart",CartSchema);