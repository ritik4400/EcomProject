const Order = require('../models/order');

const {orderSchema}= require('../validator/orderValidator');
const { addOrderService}= require('../service/order.service');

const  addOrder = async (req, res) => {
    try {
        const {error}= orderSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message});
        }
        const { userId } = req.body;

        const order = await addOrderService({ userId });

        res.status(201).json(order);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: error.message });
    }
}
const fetchOrder = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.status(200).json(orders);
    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addOrder , fetchOrder
}