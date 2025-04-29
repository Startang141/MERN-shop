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
  const queryObj = { ...req.query };

  const excludeField = ["page", "limit"];
  excludeField.forEach((element) => delete queryObj[element]);

  let query;

  if (req.query.name) {
    query = Product.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  } else {
    query = Product.find(queryObj);
  }

  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 10;
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  let countProduct = await Product.countDocuments();
  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(404);
      throw new Error("This page does not exist");
    }
  }

  const data = await query;

  return res.status(200).json({
    message: "All products retrieved successfully",
    data,
    count: countProduct,
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
  const { id } = req.params;
  const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: "update product successfully",
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);

  return res.status(200).json({
    message: "deleted product successfully",
  });
});

export const fileUpload = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const imageFileName = file.filename;
  const pathImageFile = `/upload/${imageFileName}`;

  res.status(200).json({
    message: "Image uploaded",
    image: pathImageFile,
  });
});
