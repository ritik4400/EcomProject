const express = require('express');
const morgan = require('morgan');
const logger = require('./src/config/logger');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db')
const errorHandler = require('./src/middlewares/errorHandler')
require('dotenv').config();

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

// B. Morgan Logging Middleware
const morganStream = {
  write: (message) => {
    // Morgan adds a newline character at the end, so trim it
    logger.http(message.trim());
  },
};
app.use(morgan('combined', { stream: morganStream }));

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

app.use(errorHandler)
connectDB();
const port = process.env.port || 8080;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    console.log("http://localhost:8080/Health");
})
