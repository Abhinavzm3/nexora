import express from 'express'
import {Message} from '../models/messageModel.js'
import { Conversation} from '../models/conversationModel.js'
export const sendMessage =async(req,res)=>{
    try {

        const senderId=req.id;
        const reciverId=req.params.id;
        const message=req.body;

        let gotConversation=await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        })

        if(gotConversation){
             
            gotConversation=await Conversation.create({
                participants:[senderId,reciverId]
            })

        }

        const newmessage=await Message.create({
            senderId,
            reciverId,message
        })
        
    } catch (error) {
        console.log(error)
    }
}