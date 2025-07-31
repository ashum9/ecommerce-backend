import productModel from "../models/product.model.js";
import cloudinary from "cloudinary"
import { getDataUri } from "../utils/feature.js";

export const getAllProductController = async (req , res) => {

    try {
        
        const products = await productModel.find({})
        res.status(200).json({
            success : true,
            message : "successfully get all products",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error in getting all products",
            error
        })
        
    }

}

export const getSingleProductController = async (req , res) => {

    try {

        // get product id from url
        const product = await productModel.findById(req.params.id)

        //check whether the product is in database or not -> validation
        if(!product){
            // yahi se nikal jao
            return res.status(500).json({
                success : false ,
                message : "product is not in database"
            })
        }

        res.status(200).json({
            success : true ,
            message : "product found successfully",
            product
        })
        
    } catch (error) {
        console.log(error);

        // error due to incorrect id only
        if(error.name === "CastError"){
            return res.status(500).json({
                success : false ,
                message : "invalid product id"
            })
        }

        // all other reasons for error
        res.status(500).json({
            success : false ,
            message : "error in getting this product",
            error
        })
        
    }

}

export const createProductController = async( req,res) => {

    try {
        
        const {name , description , price , stock , category } = req.body;

        //validation
        if(!name || !description || !price || !stock){
            return res.status(500).json({
                success : false ,
                message : "please enter all required fields"
            })
        }

        const file = getDataUri(req.file)
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id : cdb.public_id,
            url : cdb.secure_url
        }

        await productModel.create({
            name , description , price , stock , images : [image]
        })

        res.status(201).json({
            success : true ,
            message : "product created successfully"
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error in creatin product now",
            error
        })
        
    }

}

export const updateProductController = async (req,res) => {

    try {

        const product = await productModel.findById(req.params.id)
        // if product not in db -> validation

        if(!product){
            return res.status(400).json({
                success : false ,
                message : "product is not registered"
            })
        }

        const {name , description , price , stock } = req.body

        // if name has any value -> update it!
        if(name) product.name = name
        if(description) product.description = description
        if(price) product.price = price
        if(stock) product.stock = stock


        await product.save()
        res.status(200).json({
            success : true,
            message : "updated values successfully"
        })
        
    } catch (error) {
        console.log(error);
        if(error.name === "CastError"){
            return res.status(500).json({
                success : false,
                message : "invalid id"
            })
        }
        res.status(500).json({
            success : false ,
            message : "error in updating product",
            error
        })
        
    }

}