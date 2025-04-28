import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/logout", (req, res) => {
  res.send("Logout route");
});

router.get("/getUser", (req, res) => {
  res.send("Get User route");
});

export default router;
