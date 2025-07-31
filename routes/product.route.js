import express from "express"
import { getAllProductController, getSingleProductController } from "../controllers/product.router.js"

const router = express.Router()

router.get("/get-all" ,getAllProductController )
router.get("/:id" , getSingleProductController)

export default router
