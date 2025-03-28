const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['Veg','Non-veg']
            }
        ]
    },
       
image:{
        type:String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
})

module.exports = mongoose.model('Product',productSchema)