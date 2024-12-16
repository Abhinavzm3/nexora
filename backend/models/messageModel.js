import mongoose from "mongoose";
 

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:false
    },
      imageUrl: { // Add this field to store the image URL
        type: String,
        required: false
    }
   
},{timestamps:true})

export const Message=mongoose.model("Message",messageSchema)