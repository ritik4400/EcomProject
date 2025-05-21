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
  updateUserSchema,
} = require("../validator/userValidator");

route.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});


const {registerUser , login} = require("../controller.js/user.auth")
//Auth Routes
route.post('/register' ,registerUser);
route.post("/login", login);

route.get("/", (req, res) => {
  res.render("index");
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
