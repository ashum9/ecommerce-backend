import express from "express"

import { forgotPass, getProfile, loginController, logoutUser, profileUpdate, registerController, updateDP, updatePass } from "../controllers/user.controller.js"
import { isAuth } from "../middlewares/auth.middleware.js"
import { singleUpload } from "../middlewares/multer.js"

//router object
const router = express.Router()

//routes

// register user
router.post("/register" , registerController)

// login user
router.post("/login" , loginController)

// get profile 
router.get("/profile" , isAuth ,getProfile)

// logout user
router.get("/logout" , isAuth , logoutUser)

// update profile user
router.put("/update" , isAuth, profileUpdate)

// update password user
router.put("/update-password" , isAuth , updatePass)




export default router