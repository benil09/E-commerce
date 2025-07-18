import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        min:0
    },
    image:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:false,
        default:false
    }

},{timestamps:true})


const Product = mongoose.model("Product",productSchema)
export default Product;