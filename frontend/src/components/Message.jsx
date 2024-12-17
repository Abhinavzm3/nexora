import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MediaRenderer from "./MediaRender";
import axios from "axios";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    // Scroll to the new message whenever a new message is added
    scroll.current?.scrollIntoView({ behavior: "smooth" });
   
  }, [message]);

  //translator
  





  // Ensure you are comparing senderId with authUser._id
  const isSender = message?.senderId === authUser?._id;

  return (
    <div
      ref={scroll}
      className={`chat ${isSender ? "chat-end" : "chat-start"}`}
    >
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
        className={`chat-bubble ${isSender ? "" : "bg-gray-200 text-black"} w-auto`}
      ><p className="break-words "> {message?.message}</p>
       

         {/* Image Preview */}
      
         {/* {message.imageUrl && (
            <div className="mt-2">
              <a href={message.imageUrl} download={message.imageUrl} target="_blank" rel="noopener noreferrer"> <img
                src={message.imageUrl}
                alt="uploaded"
                className="w-24 h-24 object-cover border rounded-lg"
              /></a>
             
            </div>
          )} */}


{message.imageUrl && (<MediaRenderer  fileUrl={message.imageUrl}></MediaRenderer>
)}

      </div>

        
    </div>
  );
};

export default Message;
