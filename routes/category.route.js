import express from "express"
import { isAuth } from "../middlewares/auth.middleware.js"
import { createCategory, getAllCategory } from "../controllers/category.controller.js"

const router = express.Router()

router.post("/create" , isAuth , createCategory)
router.get("/get-all" , getAllCategory)

export default router