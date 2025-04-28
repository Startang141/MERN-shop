import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", protectedMiddleware, logoutUser);

router.get("/getUser", protectedMiddleware, getCurrentUser);

export default router;
