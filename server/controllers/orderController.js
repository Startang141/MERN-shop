import asyncHandler from "../middlewares/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "create order",
  });
});

export const allOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "all order",
  });
});
export const detailOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "detail order",
  });
});
export const currentUserOrder = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "current user order",
  });
});
