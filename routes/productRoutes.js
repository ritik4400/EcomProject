const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const path = require("path");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const { createProductSchema } = require("../validator/productValidator");

router.get("/", (req, res) => {
  res.send("product routes");
});
//list of product
router.get("/list", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(200).json(product);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.send(500).json({ message: error.message });
  }
});
//create products
// router.post('/create',authMiddleware, adminMiddleware,async(req,res)=>{
router.post("/create", async (req, res) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return res.send(401).json({ message: error.details[0].message });
    }

    const { name, description, price, category, stock } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
    });
    res.send(200).json(product);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.send(500).json({ message: error.message });
  }
});

module.exports = router;
