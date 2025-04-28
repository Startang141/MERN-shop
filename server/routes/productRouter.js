import express from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";
import {
  allProduct,
  createProduct,
  deleteProduct,
  detailProduct,
  fileUpload,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/file-upload", fileUpload);

router.post("/", createProduct);

router.get("/", allProduct);

router.put("/:id", updateProduct);

router.post("/:id", detailProduct);

router.delete("/:id", deleteProduct);

export default router;
