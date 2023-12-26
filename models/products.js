const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    imagePath:{
        type:String
    },
    productName:{
        type:String
    },
    productDescription:{
        type:String
    },
    productPrice:{
        type:Number
    }
    
})

const products=mongoose.model("products",productSchema)

module.exports=products