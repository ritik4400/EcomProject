const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET='your-secret-key';
// Middleware to check if the user is authenticated
const authMiddleware =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({messege:'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET,);
        req.user=decoded;
        next();
    }catch(error) {
        console.error('Authentication Error:', error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};
//admin middleware
const adminMiddleware = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.user.email});

        if(user && user.isAdmin){
            next();
        }
        else{
            //403-cannot allow access to requested resource
            res.status(403).json({messege:'Forbidden:admin only'})
        }
    }catch (error) {
        console.error('Authorization Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports= {authMiddleware,adminMiddleware};
