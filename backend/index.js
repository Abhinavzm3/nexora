import express from 'express'
const app=express()
import env from 'dotenv'
env.config()


app.get('/',(req,res)=>{
    res.send("hi")
})

app.listen(process.env.PORT,()=>{
    console.log("running on 3000")
})