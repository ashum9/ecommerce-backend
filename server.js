import express from "express"
import colors from "colors"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

//dotenv config
dotenv.config()

//db connection
connectDB()

const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//route
import { registerUser } from "./routes/user.route.js"
app.use("/api/v1/user", registerUser);

app.get("/" , (req,res) => {
    return res.status(200).send("swagat hai")
})

const PORT = process.env.PORT || 9696

app.listen(PORT , () => {
    console.log(`server runnning on ${PORT}`.bgYellow.black);
    
})