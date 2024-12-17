import React, { useEffect ,useRef} from "react";
import Message from "./Message";
import UseGetMessages from "../hooks/UseGetMessages";
import { useSelector } from "react-redux";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
const Messages = () => {
  UseGetMessages();
  useGetRealTimeMessage();
 const {authUser}=useSelector(store=>store.user)
  const { messages } = useSelector((store) => store.message);
  const audio = new Audio("/tones/Whatsapp Message - QuickSounds.com.mp3");

useEffect(()=>{

  if(messages.length>0){
    const lastmessage=messages[messages.length-1]
    if(lastmessage.senderId!==authUser._id){
      audio.volume = 0.8; // Adjust volume if needed
      audio.play()
    }
  }

},[messages])
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
