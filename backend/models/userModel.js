import mongoose from "mongoose";
 

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    Username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female'],

    }
    ,profilePhoto:{
        type:String,
        default:""
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema)