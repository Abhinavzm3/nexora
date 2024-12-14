import React from 'react'
import OtherUser from './OtherUser'
import UseGetOtherUsers from '../hooks/UseGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {

  UseGetOtherUsers();
 const {OtherUsers}=useSelector(store=>store.user)
 if(!OtherUsers) return; //early return in react
  return (
  <div className='overflow-auto'>

    {
      OtherUsers?.map((user)=>(
       
          <OtherUser key={user._id} user={user}></OtherUser>
       
      ))
    }
   
  </div>
  )
}

export default OtherUsers
