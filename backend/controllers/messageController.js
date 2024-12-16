import express from 'express'
import {Message} from '../models/messageModel.js'
import { Conversation} from '../models/conversationModel.js'
import { getReceiverSocketId, io } from '../socket/socket.js';
export const sendMessage =async(req,res)=>{
    try {

        const senderId=req.id;
        const reciverId=req.params.id;

        const {message}=req.body;
        const {imageUrl}=req.body

        let gotConversation=await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        })

        if(!gotConversation){
             
            gotConversation=await Conversation.create({
                participants:[senderId,reciverId]
            })

        }

        const newMessage=await Message.create({
            senderId,
            reciverId,
            message,
            imageUrl
        })

        if(newMessage){
            gotConversation.message.push(newMessage._id)
        };
        // await gotConversation.save();

        await Promise.all([gotConversation.save(),newMessage.save()])

        //socket
        const reciverSocketId=getReceiverSocketId(reciverId)
if(reciverSocketId){
    io.to(reciverSocketId).emit("newMessage",newMessage);
}
        return res.status(201).send({
            message:"message sent !",
            success:true,
            newMessage
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
            messages: converstaion?.message, // Assuming 'message' is an array
        });
        
    } catch (error) {

        console.log(error)
        
    }
}