import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  allProduct,
  createProduct,
  deleteProduct,
  detailProduct,
  fileUpload,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

router.post(
  "/file-upload",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"),
  fileUpload
);

router.post("/", protectedMiddleware, adminMiddleware, createProduct);

router.get("/", allProduct);

router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

router.post("/:id", detailProduct);

router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

export default router;
