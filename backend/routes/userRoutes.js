import express from "express";
import { register,login,logout, getOtherUser } from "../controllers/userController.js";
const router=express.Router()
import {isAuthenticated} from '../middleware/isAuth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/getOtherUsers').post(isAuthenticated,getOtherUser)

export default router