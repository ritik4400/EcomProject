const Product = require("../models/product");
const { createProductSchema } = require("../validator/productValidator");
const { addProductService } = require("../service/product.service");

const addProduct = async (req, res) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      return res.send(401).json({ message: error.details[0].message });
    }
    const { name, description, price, category, stock } = req.body;

    const product = await addProductService({ name, description, price, category, stock });

    
    res.send(200).json(product);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.send(500).json({ message: error.message });
  }
}

const fetchProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(200).json(product);
  } catch (error) {
    console.error("API Error:", error.message); // Log the error message
    res.send(500).json({ message: error.message });
  }
}

module.exports = {
    addProduct , fetchProducts
}