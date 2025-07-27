import express from "express"
import { registerController } from "../controllers/user.controller.js"

//router object
const router = express.Router()

//routes
export const registerUser = router.post("/register" , registerController)