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

        const newMessage=await Message.create({
            senderId,
            reciverId,
            message
        })

        if(newMessage){
            gotConversation.message.push(newMessage._id)
        };
        await gotConversation.save();

        //socket

        return res.status(200).send({
            message:"message sent !"
            ,
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }
}


export const getMessage=async (req,res)=>{
    try {
        const reciverId=req.params.id;
        const senderId=req.id;
        const converstaion=await Conversation.findOne({
    participants:{$all:[senderId,reciverId]}
        }).populate('message')
        return res.status(200).send({
            messages: conversation.message, // Assuming 'message' is an array
        });
        
    } catch (error) {

        console.log(error)
        
    }
}