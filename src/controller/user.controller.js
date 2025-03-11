import { User } from "../models/index.js";
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

export const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ email: email }, JWT_SECRET, {
      expiresIn: "3m",
    });

    res.status(200).json({
      message: "Login Successful",
      data: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
