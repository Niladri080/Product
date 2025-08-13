import mongoose from "mongoose";
const AddressSchema=mongoose.Schema({
  user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  name:{type:String,required:true},
  phone:{type:Number,required:true},
  line1:{type:String,required:true},
  line2:{type:String},
  city:{type:String,required:true},
  state:{type:String,required:true},
  pin:{type:String,required:true},
  createdAt:{type:Date,default:Date.now}
})
export const Address=mongoose.model('Address',AddressSchema);