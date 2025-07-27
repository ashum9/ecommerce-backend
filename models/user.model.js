import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken"

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

// pass hash function
userSchema.pre("save" , async function () {
    this.password = await bcrypt.hash(this.password , 10 )
})

// pass compare function
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//jwt token
userSchema.methods.jwtToken = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
}

export const User = mongoose.model("User" , userSchema)

export default User