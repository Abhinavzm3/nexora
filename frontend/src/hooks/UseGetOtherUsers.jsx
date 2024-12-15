import axios from 'axios'
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'
const UseGetOtherUsers = () => {
const dispatch=useDispatch()
  const fetchOtherUsers = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post("http://localhost:4000/api/v1/user");
      dispatch(setOtherUsers(res.data.otherUsers))
    } catch (error) {
      console.error("Error fetching other users:", error.response?.data || error.message);
    }
  };
useEffect(()=>{

    

    fetchOtherUsers()
},[])

  return (
    <div>
      
    </div>
  )
}

export default UseGetOtherUsers
