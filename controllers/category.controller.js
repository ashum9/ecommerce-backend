import CategoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";

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

export const deleteCategory = async (req,res) => {

    try {
        
        // find the category based on parameter
        // check in db
        // delete it

        const categories = await CategoryModel.findById(req.params.id)

        if(!categories){
            return res.status(400).json({
                success : false ,
                message : "category not found"
            })
        }

        // wo product ki category undefined kro jinki category same hai categories ki tara
        // fetch products of the category
        const product = await productModel.find({category: categories._id})

       for(let i = 0 ; i < product.length ; i++){
        const prdct = product[i];
        prdct.category = undefined;
        await prdct.save()
       }
        await categories.deleteOne()

        res.status(200).json({
            success : true , 
            message : "deleted category successfully"
        })


    } catch (error) {
        console.log(error);
        if(error.name === "CastError"){
            return res.status(500).json({
                success : false ,
                message : "invalid id"
            })
        }

        res.status(500).json({
            success : false ,
            message : "error in deleting category"
        })
        
    }

}