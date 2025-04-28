import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const createSendResToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const isDev = process.env.NODE_ENV === "development" ? true : false;

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isDev ? false : true,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    data: {
      user,
    },
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const isOwner = (await User.countDocuments()) === 0;

  const role = "user";
  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role,
  });

  createSendResToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: "Please provide email and password",
    });
  }

  const emailUser = await User.findOne({ email: req.body.email });

  if (emailUser && (await emailUser.isPasswordCorrect(req.body.password))) {
    createSendResToken(emailUser, 200, res);
  }
  res.status(401).json({
    message: "Invalid email or password",
  });
});
