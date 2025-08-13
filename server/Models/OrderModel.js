import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  user_id: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      price: Number,
      quantity: Number,
      image:String,
      admin_id:{type:mongoose.Schema.Types.ObjectId,ref:'Admin',required:true}
    }
  ],
  address:
    {
      name: String,
      phone: Number,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pin: String
    }
  ,
  status:{type: String, required: true, default: "Pending"  },
    createdAt: {
    type: Date,
    default: Date.now
  },
  totalAmount: {type: Number, required: true},
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export const Order = mongoose.model("orders", OrderSchema);