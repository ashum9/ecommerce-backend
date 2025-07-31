import express from "express"
import { createProductController, getAllProductController, getSingleProductController } from "../controllers/product.router.js"
import { isAuth } from "../middlewares/auth.middleware.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.get("/get-all" ,getAllProductController )
router.get("/:id" , getSingleProductController)
router.post("/create" , isAuth  , singleUpload ,createProductController)

export default router
