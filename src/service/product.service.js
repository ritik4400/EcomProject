
const Product = require("../models/product");
const AppError = require("../utils/appError");
const addProductService = async({ name, description, price, category, stock }) =>{

    const existingProduct = await Product.findOne({ name });

  if (existingProduct) {
    throw new AppError("Product already exists", 409);
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