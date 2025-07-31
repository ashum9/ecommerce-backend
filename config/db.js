import mongoose from "mongoose";

const connectDB = async (req,res) => {
        try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected successfully ${mongoose.connection.host}`.bgCyan.black);
    
    }   catch (error) {
        console.log(`mongodb error : ${error}`.bgRed.black);
    }
}

export default connectDB