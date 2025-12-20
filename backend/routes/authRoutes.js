const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.json({ msg: "Email already exists!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  await newUser.save();
  res.json({ msg: "Signup successful!" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: "User not found!" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ msg: "Wrong password!" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    msg: "Login successful!",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

module.exports = router;
