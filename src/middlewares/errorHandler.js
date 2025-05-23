const AppError = require("../utils/appError");

const errorHandler = (err,req,res,next) =>{

    // Set default values
    err.statusCode = err.statusCode || 500;
     err.status = err.status || 'error';

     // Log the full error in development
  console.error('ERROR 💥:', err);

   // Send formatted error response
   res.status(err.statusCode).json({
    status: err.status,
    message: err.message
   })
}

module.exports = errorHandler;