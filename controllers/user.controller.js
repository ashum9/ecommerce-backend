import { User } from "../models/user.model.js";
import { getDataUri } from "../utils/feature.js";
import cloudinary from "cloudinary";

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

        const token = user.jwtToken()

        res.status(200)
        .cookie("token" , token)
        .json({
            success : true ,
            message : "login successfully !",
            user,token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : "error in login "
        })
    }
}

export const getProfile = async(req,res) => {

    try {
        const user = await User.findById(req.user._id)
        user.password = undefined
        res.status(200).json({
            success : true ,
            message : "profile pe aa gye !",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error in loading profile",
            error
        })
    }

}

export const logoutUser = async (req,res) => {

    try {
        
        res.status(200).cookie("token" , "").json({
            success : true , 
            message : "logout successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false ,
            message : "error in logout"
        })
        
    }

}

export const profileUpdate = async (req,res) => {
    try {
        
        const user = await User.findById(req.user._id)
        const {email,name,address,phone} = req.body

        if(email) user.email = email
        if(name) user.name = name
        if(address) user.address = address
        if(phone) user.phone = phone

        //after updating these values -> save the user

        await user.save()
        res.status(200).json({
            success : true ,
            message : "prodfile updated successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "error in updating profile",
            error
        })
        
    }
}

export const updatePass = async (req,res) => {

    try {
        
        const user = await User.findById(req.user._id)

        const {oldPass , newPass} = req.body

        if(!oldPass || !newPass){
            return res.status(400).json({
                success : false ,
                message : "kindly enter oldPass and newPass"
            })
        }

        // check whether old pass is same as db pass
        const isMatch = await user.comparePassword(oldPass)

        // validation for old and db pass
        if(!isMatch){
            return res.status(400).json({
                success : false ,
                message : "wrond old pass , please enter correct old pass"
            })
        }

        user.password = newPass;
        await user.save()
        res.status(200).json({
            success : true ,
            message : "password updated successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false ,
            message : "error in updating pass",
            error
        })
    }

}

export const updateDP = async(req , res) => {

    try {

        const user = await User.findById(req.user._id);

        // get file from user
        // getDataUri function will convert that file to 
        // base64 which can be accepted by cdb

        const file = getDataUri(req.file) // converted user file to base64

        // delete prev file
        // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

        // update with new file
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        user.profilePic = {
            public_id : cdb.public_id,
            url : cdb.secure_url
        }

        // save it!
        await user.save()

        res.status(200).json({
            success : true ,
            message : "dp updated successfully"
        })

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "error in updating dp",
            error
        })
        
    }
    
}