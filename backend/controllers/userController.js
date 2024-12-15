
import express from 'express'
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { profile } from 'console';
export const register=async (req,res)=>{
    try{

        const {fullName,username,password,confirmPassword,gender}=req.body;

if(!fullName || !username || !password  || !confirmPassword || !gender){
    return res.status(400).send({
        message:"all fiels required"}
    )}

    if(password!==confirmPassword){
        return res.status(400).send({
            message:"enter correct password"}
        )}
    
        const user=await User.findOne({username});
        if(user){
            return res.status.json({message:"user already exist"})
        }
        const maleprofile=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleprofile=`https://avatar.iran.liara.run/public/girl?username=${username}`
const hashedPassword=await bcrypt.hash(password,10)
    const newUser=    await User.create({
            fullName,
            password:hashedPassword,
            gender,
            username,
            profilePhoto:gender==='male'?maleprofile:femaleprofile
        })

        newUser.save();

        return res.status(201).send({
            message:"Account created!",
            success:true,
        })


}
catch(error){

    console.log(error)

}


   
}


export const login=async(req,res)=>{
    try {

        const {username,password}=req.body;

        if(!username ){
            return res.status(400).send({
                message:"username required"
            })
        }
        if(!password ){
            return res.status(400).send({
                message:"password required"
            })
        }
const user=await User.findOne({username});

        if(!user){
            return res.send("Please register , then login")
        }

        const decoded=await bcrypt.compare(password,user.password)

        if(!decoded){

            return res.send({
                message:"enter correct password",
                success:true
            })


        }
const tokenData={
    userId:user._id
}

const token=await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'7d'})


return res.status(201).cookie("token",token,{httpOnly:true}).send({
    username:user.username,
    fullName:user.fullname,
    _id:user._id,
    profilePhoto:user.profilePhoto,
    gender:user.gender,
    success:true

    
})

        
    } catch (error) {
        console.log(error)
    }

    return res.status(200).send({
        message:"logined!"
    })


}

export const logout=async(req,res)=>{

try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logged out successfully!",
        success:true
    })
} catch (error) {
    
}



}

export const getOtherUser=async(req,res)=>{
    try {
        const loggedInUserId=req.id

        
        const otherUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        return res.status(200).send({
            otherUsers
        })
    } catch (error) {
        console.log(error)
        
    }
}


