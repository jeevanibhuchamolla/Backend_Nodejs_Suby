const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const vendorRoutes = require('./routes/vendorRoutes')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')

const path = require('path')
const PORT = process.env.PORT || 4000
dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected successfully!")
})
.catch((error)=>{
    console.log(`${error}`)
})
app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
})
app.use('/',(req,res)=>{
    res.send("<h1> welcome to SUBY")
})