import express from "express"

const app = express()

app.get("/" , (req,res) => {
    return res.status(200).send("swagat hai")
})

const PORT = 6969

app.listen(PORT , () => {
    console.log(`server runnning on ${PORT}`);
    
})