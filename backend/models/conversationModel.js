import mongoose from "mongoose";
 

const ConvSchema=new mongoose.Schema({
    participants:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
  
    message:{
        type:String,
        required:true
    }
   
},{timestamps:true})

export const Conversation=mongoose.model("Conversation",ConvSchema)