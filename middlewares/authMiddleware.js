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
//rbac middleware
function authorizeRoles(...allowedRoles){
    return (req,res,next) =>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({ message: 'Access denied: insufficient permissions' });
        }
        next();
    };
}

module.exports= {authMiddleware,adminMiddleware};
