
const Product = require("../models/product");

const addProductService = async({ name, description, price, category, stock }) =>{

    const existingProduct = await Product.findOne({ name });

  if (existingProduct) {
    const error = new Error("Product already exists");
    error.statusCode = 409;
    throw error;
  }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
    });
    return product;
}

module.exports = {
    addProductService
}