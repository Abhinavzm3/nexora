import React from "react";
import Message from "./Message";
import UseGetMessages from "../hooks/UseGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
const Messages = () => {
  UseGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
 

  return (
    <div className="px-4 flex-1 w-auto overflow-auto">
      {
      
      messages && messages.map((message) => {
        return (
          <Message key={message._id} message={message} />
      )
      })}
    </div>
  );
};

export default Messages;
