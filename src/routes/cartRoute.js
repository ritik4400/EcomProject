const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const { addToCart ,fetchCarts } = require("../controller.js/cart.controller");
// Add item to cart
router.post("/add",authorizeRoles('admin','seller' , 'user'), addToCart );
// Get user cart
router.get("/:userId", authorizeRoles('user') , fetchCarts);

module.exports = router;
