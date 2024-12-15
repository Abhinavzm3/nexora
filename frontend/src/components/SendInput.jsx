import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const SendInput = () => {
  const dispatch = useDispatch();
  const {messages}=useSelector(store=>store.message)
  const { selectedUser } = useSelector((store) => store.user);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

   

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/message/send/${selectedUser?._id}`,
        { message }, // Send the message as an object
        { headers:{
          'Content-Type':'application/json'
        },
          withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages,res.data.newMessage]))
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <form className="flex items-center" onSubmit={submitHandler}>
        <div className="relative w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="w-full py-2 px-4 text-sm bg-gray-700 text-white border border-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-sky-500 hover:text-sky-600 transition duration-200"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInput;
