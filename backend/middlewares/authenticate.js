const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);

    /* if (token) {
        //next();
        return res.status(401).json({ message: 'Login first to access this resource' });
    } */

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

exports.authorizeRoles=(roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            console.log("User not eligible to access the products");
            return res.status(400).json({
                success:false
            })
        }
        else{
            next();
        }
    }
}