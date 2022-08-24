import express from "express";
import product from "../models/product.js";
import User from "../models/user.js";
import Product from "../models/product.js";

import { authorizedUser } from "../auth/auth.js";

const router = express.Router();
//add product

router.post("/add", async (req, res) => {
    const productInfo = req.body;
    try {
        const newProduct = new product(productInfo);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/productList", async (req, res) => {

    try {
        const productList = await product.find({},{ name: 1 ,price : 1});
        res.status(200).json({
            productList,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//add to cart after authorization
router.post("/addToCart/:productId", authorizedUser , async (req, res) => {
    try {
    const userID = req.user;
    const user = await User.findById({ _id: userID });
    const product = await Product.findById({ _id: req.params.productId });
    user.cart.push(product);
    await user.save();
    res.status(200).json({
       user
    });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
})





export default router;