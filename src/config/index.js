require('dotenv').config(); // Loads environment variables from a .env file

const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/local',
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

module.exports = config; // Export so other files can use it