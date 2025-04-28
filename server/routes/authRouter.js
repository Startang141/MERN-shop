import express from "express";
import User from "../models/userModel.js";
import asynchandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login route");
});

router.post(
  "/register",
  asynchandler(async (req, res) => {
    console.log("Request Body:", req.body); // Debugging: Periksa body request

    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    try {
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
);

router.get("/logout", (req, res) => {
  res.send("Logout route");
});

router.get("/getUser", (req, res) => {
  res.send("Get User route");
});

export default router;
