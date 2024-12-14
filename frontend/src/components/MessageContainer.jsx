import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = ({ user }) => {
  return (
    <div className="md:min-w-[550px] flex flex-col bg-gray-900 shadow-md rounded-md overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        {/* User Avatar */}
        <div className="avatar">
          <div className="avatar online w-full h-full">
            <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden">
              <img
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        {/* User Info */}
        <div className="flex flex-col text-white">
          <p className="text-lg font-semibold">{user?.name || "Anonymous"}</p>
          <p className="text-sm text-gray-300">Active now</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"></div>

      {/* Message Input Section */}
      <div className="flex-1 flex flex-col justify-between p-4 bg-gray-800">
        {/* Message Container with Scroll */}
        <div className="flex-1 overflow-y-auto max-h-[350px]">
          <div className="text-center text-gray-400 italic">
            <Messages />
          </div>
        </div>
        <div className="mt-1">
          <SendInput />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
