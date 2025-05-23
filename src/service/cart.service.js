const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
// const ObjectId = mongoose.Types.ObjectId;
const { ObjectId } = require('mongoose').Types;
const AppError = require("../utils/appError");

const addToCartService = async (userId, productId, quantity) => {
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
    throw new AppError("Invalid ObjectId format");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product not found",404);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      userId: new ObjectId(userId),
      items: [{ productId: new ObjectId(productId), quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: new ObjectId(productId), quantity });
    }
  }

  await cart.save();
  return cart;
};

module.exports ={
    addToCartService
}
