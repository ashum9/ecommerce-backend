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

        //11000 error check krle
        const existingUser = await User.findOne({email})
        //validation
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "this email is already registered"
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

export const loginController = async (req,res) => {

    try {

        const {email , password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success : false ,
                message : "please fill all required inputs!"
            })
        }

        //check whether registered or not
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                success : false ,
                message : "please register first"
            })
        }

        // match password
        const passValid = await user.comparePassword(password);

        if(!passValid){
            return res.status(400).json({
                success : false ,
                message : "invalid credentials"
            })
        }

        res.status(200).json({
            success : true ,
            message : "loginc successfully !",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : "error in login "
        })
        
    }

}