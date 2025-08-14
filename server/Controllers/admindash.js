import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { Admin } from "../Models/AdminModel.js";
import { Order } from "../Models/OrderModel.js";
import { Product } from "../Models/ProductModel.js";
import { productView } from "./homeAuth.js";
import { User } from "../Models/userModel.js";
import { Address } from "../Models/Address.js";

export const getdash = (req, res) => {
  res.status(200).json({
    success: true,
    message: "You have been successfully logged in",
    user: req.user,
  });
};
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, type, admin_id, admin_name } = req.body;
    if (!name || !price || !description || !type || !admin_id || !admin_name) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: name, price, description, type, admin_id, admin_name",
      });
    }
    const numericPrice = Number(price);
    if (!numericPrice || isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image for the product",
      });
    }
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });
    const image = uploadResult.secure_url;
    const newProduct = new Product({
      name,
      price: Math.round(numericPrice),
      description,
      type,
      admin_id,
      admin_name,
      image,
    });
    await newProduct.save();
    await Admin.findByIdAndUpdate(admin_id, { $inc: { products: 1 } });
    return res.status(201).json({
      success: true,
      message: "Product listed successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Sorry, your product could not be listed. Please try again.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const getUser = async (req, res) => {
  const { UserId } = req.body;
  const newUser = await Admin.findOne({ _id: UserId });
  const products = await Product.find({ admin_id: UserId });
  const orders = await Order.find({ "products.admin_id": UserId });
  const finalOrders = orders.map(order => ({
      ...order.toObject(),
      products: order.products.filter(p => String(p.admin_id) === String(UserId))
  }));
   let totalProfit=0;
    finalOrders.forEach(order => {
      totalProfit+=order.products.reduce((sum,product) => sum + product.price * product.quantity, 0);
    });
    await Admin.findByIdAndUpdate(UserId, { 
  $set: { revenue: totalProfit,orders:finalOrders.length  } ,
});
  if (!newUser) {
    return res.status(404).json({ success: false });
  }
  return res.status(200).json({ success: true, user: newUser ,products:products,orders:finalOrders});
};
export const getProducts = async (req, res) => {
  try {
    const { UserId } = req.body;
    const products = await Product.find({ admin_id: UserId });
    return res.status(200).json({ success: true, products:products });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false });
  }
};
export const editProduct = async (req, res) => {
  console.log("Edit product function called");

  try {
    const { id, name, price, description, type } = req.body;
    if (!id || !name || !price || !description || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields (id, name, price, description, type) are required",
      });
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist",
      });
    }
    let image = product.image;
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      image = uploadResult.secure_url;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          price: Math.round(numericPrice),
          description,
          type,
          image,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating product",
    });
  }
};
export const findProduct=async(req,res)=>{
  const {id}=req.body;
  if (!id){
    return res.status(400);
  }
  const product=await Product.findOne({_id:id});
  return res.status(200).json({success:true,product:product});
}
export const deleteItem=async (req,res)=>{
  const {id}=req.body;
  const find=await Product.findOne({_id:id});
  if (!find){
    return res.status(400).json({success:false});
  }
  await Admin.findByIdAndUpdate(find.admin_id,{$inc: {products:-1}});
  await Product.findByIdAndDelete({_id:id});
  return res.status(200).json({success:true,message:"Product delete successfully"});
}
export const profileUpdate=async (req,res)=>{
  const {id,name,email,phone,address}=req.body;
  const newUser=await Admin.findByIdAndUpdate(id,{$set:{name:name,email:email,phone:phone,address:address}},{new:true});
  if (!newUser){
    return res.status(400).json({success:false});
  }
  return res.status(200).json({success:true,message:"Your profile updated successfully",user:newUser});
}
export const getOrders = async (req, res) => {
  try {
    const { id } = req.body;

    const orders = await Order.find({ "products.admin_id": id });
    const finalOrders = orders.map(order => ({
      ...order.toObject(),
      products: order.products.filter(p => String(p.admin_id) === String(id))
    }));
    if (!finalOrders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    return res.status(200).json({ success: true, orders: finalOrders });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
export const getCustomers = async (req, res) => {
  try {
    console.log("Get customers function called");
    const { id } = req.body;

    const orders = await Order.find({ "products.admin_id": id });

    const customerIds = [];
    orders.forEach(order => {
      const uid = order.user_id.toString(); // convert ObjectId to string
      if (!customerIds.includes(uid)) {
        customerIds.push(uid);
      }
    });

    const userDetails = await Promise.all(
      customerIds.map(async (customerId) => {
        const user = await User.findById(customerId);
        const address = await Address.findOne({ user_id: customerId });
        return { email: user.email, address: address };
      })
    );

    console.log(userDetails);
    return res.status(200).json({ success: true, customers: userDetails });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

