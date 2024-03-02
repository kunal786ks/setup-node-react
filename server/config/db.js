const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected ${conn.connection.host}`)
    }catch(erorr){
        console.log(erorr)
    }
}

module.exports=connectDB