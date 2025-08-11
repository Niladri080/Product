import { Cart } from "../Models/CartModel.js";
import { Product } from "../Models/ProductModel.js";

export const dashGet = (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to Products", user: req.user });
};
export const menProducts = async (req, res) => {
  const products = await Product.find({ type: "men" });
  return res.status(200).json({ success: true, products });
};
export const womenProducts = async (req, res) => {
  const products = await Product.find({ type: "women" });
  return res.status(200).json({ success: true, products });
};
export const electronics = async (req, res) => {
  const products = await Product.find({ type: "electronics" });
  return res.status(200).json({ success: true, products });
};
export const accessories = async (req, res) => {
  const products = await Product.find({ type: "accessories" });
  return res.status(200).json({ success: true, products });
};
export const productView = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    return res.status(400).json({ success: false });
  }
  return res.status(200).json({ success: true, product: product });
};
export const AddCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    if (!user_id || !product_id || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    const existing = await Cart.findOne({ user_id, product_id });
    if (existing) {
      return res
        .status(202)
        .json({ success: false, message: "Product already exists in cart" });
    }
    const newProduct = await new Cart({
      user_id,
      product_id,
      quantity,
    });
    console.log(newProduct);
    await newProduct.save();
    return res
      .status(202)
      .json({ success: true, message: "Product added to cart" });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      success: false,
      message: "Network error.Please try again later",
    });
  }
};
export const getCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const cartIds = await Cart.find({ user_id: user_id });
    const products = await Promise.all(
      cartIds.map(async (cart) => {
        const product = await Product.findOne({ _id: cart.product_id });
        return {
          ...product._doc,
          quantity: cart.quantity,
        };
      })
    );
    return res.status(200).json({ success: true, products: products });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Network error.Please try again later",
    });
  }
};
export const Home_Products = async (req, res) => {
  try {
    const products = await Product.find();
    const slider = [];
    for (let i = 0; i < products.length && slider.length < 4; i++) {
      if (
        products[i].type === "electronics" ||
        products[i].type === "accessories"
      ) {
        slider.push(products[i]);
      }
    }
    const viewProducts = [];
    for (let i = 0; i < products.length && viewProducts.length < 7; i++) {
      if (products[i].type === "men" || products[i].type === "women") {
        viewProducts.push(products[i]);
      }
    }
    return res
      .status(200)
      .json({ success: true, slider: slider, home: viewProducts });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .json({
        success: false,
        message: "NetWork Error.Please try again later",
      });
  }
};
