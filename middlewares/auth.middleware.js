import JWT from "jsonwebtoken"
import User from "../models/user.model.js"

export const isAuth = async(req,res,next) => {

    const {token} = req.cookies
    if(!token){
        return res.status(400).json({
            success : false ,
            message : "unauthorised user attempt!"
        })
    }

    const extractedData = JWT.verify(token , process.env.JWT_SECRET)

    req.user = await User.findById(extractedData._id)

    next()

}