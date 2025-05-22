const express = require('express');
const router = express.Router();

const {addOrder , fetchOrder}= require('../controller.js/order.controller');

// Create order
router.post('/create',addOrder );
// Get user orders
router.get('/:userId', fetchOrder);

module.exports=router;