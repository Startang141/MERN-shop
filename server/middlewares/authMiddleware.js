import jwt from "jsonwebtoken";
import user from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

export const protectedMiddleware = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
});
