const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const Joi = require("joi");
const {
  loginSchema,
  registerSchema,
  updateUserSchema,
} = require("../validator/userValidator");

route.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

route.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});
route.get("/", (req, res) => {
  res.render("index");
});
//create
route.post("/register", async (req, res) => {
  try {
    //input validation
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ messege: error.details[0].messege });
    }
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please log in." });
    }
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // // Generate a token
    // const token = jwt.sign(
    //   { email },
    //   process.env.JWT_SECRET || "your-secret-key",
    //   { expiresIn: "1h" }
    // );

    // Create the user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      tempPassword: password,
      role: role || "user",
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    // Respond with success
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
    console.error("API Error:", error.message);
  }
});
//get all
route.get(
  "/request",
  authMiddleware,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const user = await User.find({});
      if (!user) {
        res.status(404).json({ message: "Users Not Found" });
      }
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).json({success: false, message: error.message });
    }
  }
);
//GET SPECIFIC ID
route.get("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Users Not Found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ success: false, message: error.message });
  }
});
//update
route.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, email, password, role } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: error.message });
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = route;
