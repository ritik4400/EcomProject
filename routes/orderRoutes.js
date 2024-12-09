const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const {orderSchema}= require('../validator/orderValidator');

// Create order
router.post('/create', async (req, res) => {
    try {
        const {error}= orderSchema.validate(req.body);
        if(error){
            return res.status(400).json({messege: error.details[0].messege});
        }
        const { userId } = req.body;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        const order = await Order.create({
            user: userId,
            items: orderItems,
            total
        });
        res.status(201).json(order);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});
// Get user orders
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports=router;