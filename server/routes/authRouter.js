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
    console.log(req.body);
    await User.create({
      name: req.body.name,
    });
  })
);

router.get("/logout", (req, res) => {
  res.send("Logout route");
});

router.get("/getUser", (req, res) => {
  res.send("Get User route");
});

export default router;
