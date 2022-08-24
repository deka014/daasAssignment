import express from "express";
import product from "../models/product.js";

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

//add to cart route 




export default router;