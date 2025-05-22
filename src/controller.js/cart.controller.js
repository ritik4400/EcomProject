const Cart = require("../models/cart");
const { cartSchema } = require("../validator/cartValidator");
const { addToCartService } = require("../service/cart.service");


const addToCart = async (req, res) => {
  try {

    const { error } = cartSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userId, productId, quantity } = req.body;

     const cart = await addToCartService(userId, productId, quantity);

    res.status(200).json(cart);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

const fetchCarts = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cart = await Cart.findOne({ userId: userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    addToCart , fetchCarts
}