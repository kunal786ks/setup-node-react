const jwt=require('jsonwebtoken');


const generateToken=(user)=>{
    const payload={
        _id:user._id,
        name:user.name,
        email:user.email
    }
    return jwt.sign(payload,process.env.JWT_SECRET)
}

module.exports={generateToken}