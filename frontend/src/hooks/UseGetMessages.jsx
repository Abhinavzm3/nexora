import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UseGetMessages = () => {
 const dispatch=useDispatch()

 const {selectedUser}=useSelector(store=>store.user)
    useEffect(()=>
        {

            const fetchMessages=async()=>{


                try {
                    axios.defaults.withCredentials=true;
                    const res=await axios.post(`http://localhost:4000/api/v1/message/get/${selectedUser?._id}`);

                    if(res.data.success){
                        dispatch()
                        

                    }
                    
                } catch (error) {

                    console.log(error)
                    
                }
            }


        },[]
    )
}

export default UseGetMessages
