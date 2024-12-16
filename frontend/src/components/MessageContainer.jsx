import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  // Ensure we handle undefined or null values for authUser's full name
  const authUserName = authUser?.username;

  if (!selectedUser) {
    return (
      <div className="w-96 flex justify-center text-center flex-col bg-gray-900 shadow-md rounded-md overflow-hidden">
        <h1 className="font-semibold">Hi... {authUserName}, Let's Chat</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-gray-900 shadow-md rounded-md overflow-hidden">
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="avatar">
          <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden">
            <img
              src={selectedUser ? selectedUser.profilePhoto : '/images/chat.webp'}
              alt="User Avatar"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col text-white">
          <p className="text-lg font-semibold">{selectedUser?.fullName || "Start Chatting..."}</p>
        </div>
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"></div>

      <div className="flex-1 flex flex-col justify-between p-4 bg-gray-800">
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
