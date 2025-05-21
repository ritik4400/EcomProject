const express = require('express');
// const dotenv = require('dotenv');
const mongoose= require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db')

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const cartRoutes = require('./src/routes/cartRoute');
const orderRoutes = require('./src/routes/orderRoutes');

const path = require('path');
const { log } = require('console');
const app = express();

// dotenv.config();
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

// mongoose.connect(config.MONGO_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

connectDB();
const port = process.env.port || 8080;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    console.log("http://localhost:8080/Health");
})
