import jwt from 'jsonwebtoken'
export const isAuthenticated=async(req,res,next)=>{
    try {

        const token=req.cookies.token;
        if(!token){
            return res.status(400).send({
                message:"user nt authenticated",
            })
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(400).send({
                message:"invalid token",
            })
        }
        req.id=decoded.id
        next()
        
    } catch (error) {
       console.log(error) 
    }
}  