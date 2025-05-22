const Order = require('../models/order');
const Cart = require('../models/cart');

const  addOrderService = async({ userId })=>{
    const cart = await Cart.findOne({ userId: userId }).populate('items.productId');
        console.log(cart);
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
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