const mongoose= require('mongoose');
const express = require('express');
const router= express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const {cartSchema}= require('../validator/cartValidator');

// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const {error}= cartSchema.validate(req.body);
        if(error){
            return res.status(400).json({messege: error.details[0].messege});
        }
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (!cart) {
            cart = await Cart.create({ user: userId, items: [{ product: productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// Get user cart
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports=router;