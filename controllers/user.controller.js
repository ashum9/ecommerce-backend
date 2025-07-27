import { User } from "../models/user.model.js";

export const registerController = async (req,res) => {
    try {
        
        const {name , email , password , address , phone , profilePic} = req.body

        // validation 
        if(!name || !email || !password || !address || !phone ){
            return res.status(400).json({
                success : false ,
                message : "provide all fields"
            })
        }

        const user = await User.create({
            name , email , password , address , phone , profilePic
        })
        res.status(201).send({
            success:true,
            message:"registration successful , login kr skta hai",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false ,
            message : "error in register API",
            error
        })
    }
}