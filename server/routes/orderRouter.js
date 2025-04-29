import express from "express";
import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  allOrder,
  createOrder,
  currentUserOrder,
  detailOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protectedMiddleware, createOrder);

router.get("/", protectedMiddleware, adminMiddleware, allOrder);

router.get("/current-user", protectedMiddleware, currentUserOrder);

router.get("/:id", protectedMiddleware, adminMiddleware, detailOrder);

export default router;
