const express = require("express");
const router = express.Router();


const { addToCart ,fetchCarts } = require("../controller.js/cart.controller");
// Add item to cart
router.post("/add",addToCart );
// Get user cart
router.get("/:userId", fetchCarts);

module.exports = router;
