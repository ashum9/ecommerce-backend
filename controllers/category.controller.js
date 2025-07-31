import CategoryModel from "../models/category.model.js";

export const createCategory = async(req,res) => {
 
    try {
        
        // take parameters from req
        const {category} = req.body

        if(!category){
            return res.status(400).json({
                success : false,
                message : "please enter category name"
            })
        }

        await CategoryModel.create({category})

        res.status(200).json({
            success : true,
            message : `${category} category created successfully`
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false ,
            message : "error in creating category"
        })
    }
    
}

export const getAllCategory = async (req,res) => {

    try {

        // just give all categories
        const categories = await CategoryModel.find({})
        res.status(200).json({
            success : true,
            message : "all categories fetched successfully",
            totalCategoris : categories.length,
            categories
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error in getting all categories"
        })
        
    }

}