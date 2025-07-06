import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,

    },
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,

    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true,

    },
    avatar : {
        type : String, // cludnery
        required : true
    },
    coverImage : {
        type : String, // cludnery
        
    },
    watchhistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    password : {
        type : String,
        required : [true,'password is required']
    },
    refreshtoken : {
        type : String,

    }
},{timestamps:true})

userSchema.pre("save" , async function (next){
    if(this.isModified("password")) return next()
this.password = bcrypt.hash(this.password, 10)
next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    bcrypt.compare(password,this.password)
    
}

export const User = new mongoose.model("User",userSchema)

// jwt is beard Token that someone will have we will send data to him