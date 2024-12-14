import React from "react";
const OtherUser = (props) => {
  
  
  const user=props.user
  
  
  return (
    <div className="flex flex-col">
      {/* User Section */}
      <div className="flex items-center gap-4 p-4 hover:bg-gray-200 transition-all rounded-lg cursor-pointer">
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
