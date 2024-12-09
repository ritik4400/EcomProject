const express = require('express');
const dotenv = require('dotenv');
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoutes');

const path = require('path');
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/Health',(req,res)=>{
    res.send("Working");
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect('mongodb://localhost:27017/local')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const port = process.env.port || 8080;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
