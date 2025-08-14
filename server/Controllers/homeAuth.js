import { Address } from "../Models/Address.js";
import { Cart } from "../Models/CartModel.js";
import { Order } from "../Models/OrderModel.js";
import { Product } from "../Models/ProductModel.js";
import { User } from "../Models/userModel.js";

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
for (let i = 0; i < products.length; i++) {
  if (viewProducts.length >= 6) break;
  if (products[i].type === "men" || products[i].type === "women") {
    viewProducts.push(products[i]);
  }
}
    return res
      .status(200)
      .json({ success: true, slider: slider, home: viewProducts });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      success: false,
      message: "NetWork Error.Please try again later",
    });
  }
};
export const deleteCart = async (req, res) => {
  console.log("Delete cart function called");
  try {
    const { user_id, product_id } = req.body;
    const cart = await Cart.findOneAndDelete({ user_id, product_id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting product",
    });
  }
};
export const createOrder = async (req, res) => {
  try {
    const { user_id, products } = req.body;
    if (!user_id || !products) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    let deliveryCharge = 0;
    let subTotalPrice = products.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    if (subTotalPrice < 1000) {
      deliveryCharge = 100;
    }
    subTotalPrice = subTotalPrice + subTotalPrice * 0.05;
    let totalPrice = subTotalPrice + deliveryCharge;
    const order = new Order({
      user_id,
      products,
      totalAmount: totalPrice,
    });
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Request successfull.Redirecting to Payment page",
      orderId: order._id,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error occurred while placing order" });
  }
};
export const showOrder = async (req, res) => {
  const { id } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  let deliveryCharge = 0;
  let subTotalPrice = order.products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  if (subTotalPrice < 1000) {
    deliveryCharge = 100;
  }
  subTotalPrice = subTotalPrice + subTotalPrice * 0.005;
  let totalPrice = subTotalPrice + deliveryCharge;
  const address = await Address.findOne({ user_id: order.user_id });
  return res.status(200).json({
    success: true,
    order: order,
    totalPrice: totalPrice,
    deliveryCharge: deliveryCharge,
    subTotalPrice: subTotalPrice,
    address: address,
  });
};export const FinalOrder = async (req, res) => {
  try {
    const { id, address } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        status: "Placed",
        address: {
          name: address.name,
          phone: address.phone,
          line1: address.line1,
          line2: address.line2,
          city: address.city,
          state: address.state,
          pin: address.pincode,
        },
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    await Promise.all(
      order.products.map((p) =>
        Product.findByIdAndUpdate(
          p.id,
          { $inc: { sales: p.quantity } }
        )
      )
    );

    const userId = order.user_id;
    const existingAddress = await Address.findOne({ user_id: userId });

    if (!existingAddress) {
      const newAddress = new Address({
        user_id: userId,
        name: address.name,
        phone: address.phone,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        pin: address.pincode,
      });
      await newAddress.save();
    } else {
      await Address.findByIdAndUpdate(existingAddress._id, {
        name: address.name,
        phone: address.phone,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        pin: address.pincode,
      });
    }

    await Cart.deleteMany({ user_id: userId });

    return res.status(200).json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while completing order",
    });
  }
};

export const CancelOrder = async (req, res) => {
  const { id } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  await Order.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ success: true, message: "Order cancelled successfully" });
};
export const profileUpdate = async (req, res) => {
  console.log("Update profile called");
  const { id, name, email } = req.body;
  const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  return res.status(200).json({ success: true, user: user });
};
export const getOrders=async (req,res)=>{
  const { userId } = req.body;
  const orders = await Order.find({ user_id: userId });
  if (!orders) {
    return res.status(404).json({ success: false, message: "Orders not found" });
  }
  return res.status(200).json({ success: true, orders: orders });
}
