import express from "express"
import { getProfile, loginController, registerController } from "../controllers/user.controller.js"
import { isAuth } from "../middlewares/auth.middleware.js"

//router object
const router = express.Router()

//routes
router.post("/register" , registerController)
router.post("/login" , loginController)
router.get("/profile" , isAuth ,getProfile)
router.get("/logout" , isAuth)

export default router