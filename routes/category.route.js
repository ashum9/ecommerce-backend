import express from "express"
import { isAuth } from "../middlewares/auth.middleware.js"
import { createCategory, deleteCategory, getAllCategory } from "../controllers/category.controller.js"

const router = express.Router()

router.post("/create" , isAuth , createCategory)
router.get("/get-all" , getAllCategory)
router.delete("/delete/:id" , isAuth , deleteCategory   )

export default router