import express from "express"
import { createProductController, deleteImageProductController, deleteProductController, getAllProductController, getSingleProductController, updateImageProductController, updateProductController } from "../controllers/product.router.js"
import { isAuth } from "../middlewares/auth.middleware.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.get("/get-all" ,getAllProductController )
router.get("/:id" , getSingleProductController)
router.post("/create" , isAuth  , singleUpload ,createProductController)
router.put("/:id" , updateProductController)
router.put("/image/:id" , isAuth , singleUpload , updateImageProductController )
router.delete("/delete-image/:id" , isAuth , deleteImageProductController)
router.delete("/delete/:id"  , deleteProductController)

export default router
