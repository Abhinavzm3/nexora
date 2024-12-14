import express from 'express'
const app=express()
import env from 'dotenv'
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import {connectDB} from './config/db.js'
import messageRouter from './routes/messageRouter.js'
env.config()

app.use(express.json())
app.use(cookieParser)
app.use('api/v1/user',userRoute);
app.use('api/v1/message',messageRouter);

app.get('/',(req,res)=>{
    res.send("hi")
})

app.listen(process.env.PORT,()=>{
connectDB()
    console.log("running on 3000")
})