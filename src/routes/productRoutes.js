const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");

const { addProduct , fetchProducts } = require("../controller.js/product.controller");

router.get("/", (req, res) => {
  res.send("product routes");
});

//list of product
router.get("/list", fetchProducts );

//create products
router.post("/create", addProduct );

module.exports = router;
