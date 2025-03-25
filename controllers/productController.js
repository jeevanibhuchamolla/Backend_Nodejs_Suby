const Product = require('../models/Product')
const multer = require('multer')
const Firm = require('../models/Firm')

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
     cb(null, 'uploads/')
    } ,
    filename: function(req,file,cb){
     cb(null,Date.now()+Path.extname(file.originalname))
    }
 })
const upload = multer({storage : storage})

const addProduct = async(req ,res)=>{
    try{
        const {productname, price, category, bestSeller, description } = req.body
        const image = req.file? req.file.filename: undefined;

        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:"no firm found"})
        }
        const product = new Product ({
            productname, 
            price,
            category, 
            bestSeller,
            description,
            image,
            firm:[firm._id]
        })
        const savedProduct = await product.save()
        firm.products.push(savedProduct._id);
        await firm.save()
        return res.status(200).json(savedProduct)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}


const getProductByFirm = async(req , res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:"no firm found"})
        }
        const restaurantName = firm.firmname
        const products = await Product.find({firm: firmId});
        return res.status(200).json({restaurantName,products})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}

const deleteProductById = async(req , res)=>{
    try {
        const productId = req.params.productId
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if(!deletedProduct){
            return res.status(404).json({error:"no product found"})
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
}
module.exports = {addProduct: [upload.single('image'),addProduct],getProductByFirm,deleteProductById}