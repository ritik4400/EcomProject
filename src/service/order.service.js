const Order = require('../models/order');
const Cart = require('../models/cart');
const AppError = require("../utils/appError");

const  addOrderService = async({ userId })=>{
    const cart = await Cart.findOne({ userId: userId }).populate('items.productId');
        console.log(cart);
        
        if (!cart) {
            throw new AppError("Cart not found", 404);
        }
        const orderItems = cart.items.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));
        console.log(orderItems);
        

        const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        const order = await Order.create({
            user: userId,
            items: orderItems,
            total:total,
        });
        return order;
}


module.exports = {
    addOrderService
}