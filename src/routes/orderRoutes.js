const express = require('express');
const router = express.Router();
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {addOrder , fetchOrder}= require('../controller.js/order.controller');

// Create order
router.post('/create',authMiddleware , authorizeRoles('admin','seller' , 'user')  ,addOrder );
// Get user orders
router.get('/:userId',authMiddleware ,authorizeRoles('admin','seller')  ,  fetchOrder);

module.exports=router;