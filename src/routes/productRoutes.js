const express = require("express");
const router = express.Router();

const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const { addProduct , fetchProducts } = require("../controller.js/product.controller");

router.get("/", (req, res) => {
  res.send("product routes");
});

//list of product
router.get("/list", authMiddleware,authorizeRoles('admin','seller' , 'user') ,fetchProducts );

//create products
router.post("/create", authMiddleware ,authorizeRoles('admin','seller'),  addProduct );

module.exports = router;
