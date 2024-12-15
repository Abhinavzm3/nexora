import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    // Scroll to the new message whenever a new message is added
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  // Ensure you are comparing senderId with authUser._id
  const isSender = message?.senderId === authUser?._id;

  return (
    <div ref={scroll} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {/* Show the correct profile image based on who sent the message */}
          <img
            alt="Profile Avatar"
            src={isSender ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">
          {new Date(message?.createdAt).toLocaleTimeString()}
        </time>
      </div>
      {/* Change background color depending on sender */}
      <div
        className={`chat-bubble ${isSender ? '' : 'bg-gray-200 text-black'}`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
