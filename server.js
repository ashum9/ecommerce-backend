import express from "express"
import colors from "colors"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"

//dotenv config
dotenv.config()

//db connection
connectDB()

//cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
})

const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
import userRoutes from "./routes/user.route.js"
import productRoutes from "./routes/product.route.js"
import categoryRoutes from "./routes/category.route.js"


app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/product" , productRoutes)
app.use("/api/v1/cat" , categoryRoutes)


app.get("/" , (req,res) => {
    return res.status(200).send("swagat hai")
})

const PORT = process.env.PORT || 9696

app.listen(PORT , () => {
    console.log(`server runnning on ${PORT}`.bgYellow.black);
    
})