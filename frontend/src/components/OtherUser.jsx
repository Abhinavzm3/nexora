import React from "react";
import { setSelectedUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
const OtherUser = (props) => {
  const dispatch=useDispatch();
  const {selectedUser}= useSelector(store=>store.user)
  const user=props.user
  const SelectedUserHandler=(user)=>{

dispatch(setSelectedUser(user))

  }
  
  return (
    <div onClick={()=>{SelectedUserHandler(user)}} className="flex flex-col ">
      {/* User Section */}
      <div 
      className={` ${selectedUser?._id===user?._id ? `bg-gray-200`:''} flex items-center gap-4 p-4 hover: transition-all rounded-lg cursor-pointer`}>
        {/* Avatar */}
        <div className="avatar">
        <div className="avatar online w-full h-full">
          <div className="w-14 h-14 rounded-full border-2 border-indigo-500 overflow-hidden">
            <img
              src={user?.profilePhoto} // Placeholder image if no avatar provided
              
              alt="User Avatar"
              className="object-cover"
            />
          </div>
        </div></div>
        {/* User Info */}
        <div className="flex flex-col justify-center">
          <p className="text-lg font-medium text-gray-800">{user?.fullName}</p>
          <p className="text-sm text-gray-500">Click to start a chat</p>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5 bg-gray-300"></div>
    </div>
  );
};

export default OtherUser;
