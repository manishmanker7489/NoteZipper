import User from "../models/userModel.js";
import asyncHandeler from "express-async-handler";
import { generateToken } from "../utils/generateJWTToken.js";

export const registerUser = asyncHandeler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExixt = await User.findOne({ email });
  if (userExixt) {
    res.status(400).json("user Already Exist");
    return new Error("User Already Exist");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400).json("Invalid User Data");
    throw new Error("Invalid User Data");
  }
});

export const loginUser = asyncHandeler(async (req, res) => {
  // login logic here
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});
