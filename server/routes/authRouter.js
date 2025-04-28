import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login route");
});

router.post("/register", registerUser);

router.get("/logout", (req, res) => {
  res.send("Logout route");
});

router.get("/getUser", (req, res) => {
  res.send("Get User route");
});

export default router;
