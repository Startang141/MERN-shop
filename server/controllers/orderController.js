import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;

  if (!cartItem || cartItem.length === 0) {
    res.status(400);
    throw new Error("No cart item found");
  }

  let orderItem = [];
  let total = 0;

  for (const cart of cartItem) {
    console.log(cart);
    const productData = await Product.findById(cart._id);
    if (!productData) {
      res.status(400);
      throw new Error(`No product found with id: ${cart.product}`);
    }
    const { name, price, _id } = productData;
    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };
    orderItem = [...orderItem, singleProduct];

    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemsDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user._id,
  });

  return res.status(201).json({
    total,
    order,
    message: "create order",
  });
});

export const allOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json({
    data: orders,
    message: "all order",
  });
});
export const detailOrder = asyncHandler(async (req, res) => {
  const detailOrder = await Order.findById(req.params.id);
  return res.status(200).json({
    data: detailOrder,
    message: "detail order",
  });
});
export const currentUserOrder = asyncHandler(async (req, res) => {
  const currentUserOrder = await Order.find({ user: req.user._id });
  return res.status(200).json({
    data: currentUserOrder,
    message: "current user order",
  });
});
