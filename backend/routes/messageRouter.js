import express from 'express'
import {sendMessage,getMessage} from '../controllers/messageController.js'
import { isAuthenticated } from '../middleware/isAuth.js'
const router=express.Router()

router.route('/send/:id').post(isAuthenticated, sendMessage)
router.route('/get/:id').get(isAuthenticated, getMessage)




export default router