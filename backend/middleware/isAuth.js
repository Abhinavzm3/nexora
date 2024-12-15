import jwt from "jsonwebtoken";
export const isAuthenticated= async(req,res,next) => {
  try {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"User not authenticated."})
    };
    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decode){
        return res.status(401).json({message:"Invalid token"});
    };
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

// const req = {
//     id:"",
// }
// req.id = "sdlbgnjdfn"