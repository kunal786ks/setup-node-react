const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findOne({_id:decoded._id}).select("-password");
            next();
        } catch (error) {
            return res.status(400).json({
                message:'token verification failed'
            })
        }
    }
}


module.exports={protect}