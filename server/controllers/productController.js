import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
});

export const allProduct = asyncHandler(async (req, res) => {
  const allProducts = await Product.find();

  return res.status(200).json({
    message: "All products retrieved successfully",
    data: allProducts,
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const detailProduct = await Product.findById(id);

  if (!detailProduct) {
    res.status(404);
    throw new Error("Product not found");
  }

  return res.status(200).json({
    message: "Product details retrieved successfully",
    data: detailProduct,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

export const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete Product");
});

export const fileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload Product");
});
