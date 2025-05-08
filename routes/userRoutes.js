const mongoose = require("mongoose");
const express = require("express");
const route = express.Router();
const path = require("path");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authMiddleware} = require('../middlewares/authMiddleware')
const Joi = require("joi");
const {
  loginSchema,
  registerSchema,
  updateUserSchema,
} = require("../validator/userValidator");

route.get('/protected',authMiddleware ,(req,res)=>{
  res.json({message:"Welcome",user:req.user})
})

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
    const token = jwt.sign({ id: user.id, email: user.email , role: user.role }, 'your-secret-key' , {
      expiresIn: '1h'
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ message: error.message });
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
    const { username, email, password, isAdmin } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await User.create({
          username,
          email,
          password: hash,
          tempPassword:password,
          isAdmin,
        });
      });
      let token = jwt.sign({ email }, "email");
      res.cookie("token", token);
      res.status(201).json({ message: "User registered successfully", User });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("API Error:", error.message);
    console.log(error);
  }
});
//get all
route.get("/request", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//GET SPECIFIC ID
route.get("/request/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ message: error.message });
  }
});
//update
route.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ messege: error.details[0].messege });
    }
    const { username, email, password, isAdmin } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.status(500).json({ message: error.message });
  }
});



module.exports = route;
