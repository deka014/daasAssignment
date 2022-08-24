import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    
    },
    image: {
        type: String,
    }
});

const Product = mongoose.model("product", productSchema);

export default Product;