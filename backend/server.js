const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const jwt= require('jsonwebtoken')
const User =require('../backend/models/userModel')
const app = express()
dotenv.config()


app.use(cors())
app.use(express.json())

app.use('/api/v1',userRoutes)
app.use('/api/v1',blogRoutes)
// app.post('/api/v1/decode',async(req,res)=>{    
//         const {token} = req.body
//         const decoded =  jwt.decode(token)
//         const user = await User.findOne({_id:decoded.id})
//         res.send({
//             user
//         })

// })
const start = async()=>{
    await connectDB()
    await app.listen(5000,()=>console.log("Server Connected at 5000🚀"))
}
start()