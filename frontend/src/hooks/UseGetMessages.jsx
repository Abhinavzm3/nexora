import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const UseGetMessages = () => {
 const dispatch=useDispatch()
const {messages}=useSelector((store)=>store.message)
 const {selectedUser}=useSelector((store)=>store.user)
    useEffect(()=>
        {     


            const fetchMessages=async()=>{


                try {
                    axios.defaults.withCredentials=true;
           
                    const res=await axios.post(`http://localhost:4000/api/v1/message/get/${selectedUser?._id}`);

                  

                        dispatch(setMessages(res.data.messages))
                        


                   

                    
                } catch (error) {

                    console.log(error)
                    
                }
            }
            
            fetchMessages()


        },[selectedUser,dispatch])
}

export default UseGetMessages
