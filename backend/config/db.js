const mongoose = require('mongoose')
const dotenv= require('dotenv')
dotenv.config()
const connectDB=async()=>{
    const connection = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`MongoDB connected ${connection.connection.host}`)
}

module.exports = connectDB