import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "naam daal bhai"]
    },
    email : {
        type : String,
        required : [true , "mail to dalde!"],
        unique : [true , "420 nhi , naya mail daal"]
    },
    password : {
        type : String ,
        required : [true , "bosfk accound chumd jaega!"],
        minLength : [6 , "6 letters se bada "]
    },
    address : {
        type : String , 
        required : [true , "location mangta mere ko"]
    },
    phone : {
        type : String ,
        required : [true , "country code ke sath dalne ka"]
    },
    profilePic : {
        type : String
    }
}, {timestamps : true })

export const User = mongoose.model("User" , userSchema)

export default User