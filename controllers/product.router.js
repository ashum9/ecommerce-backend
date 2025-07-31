import productModel from "../models/product.model.js";

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
