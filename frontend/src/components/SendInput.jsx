import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import EmojiPicker from "emoji-picker-react";

const SendInput = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);

  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onEmojiClick = async (emojiObject) => {
    try {
      
      setMessage((prev) => prev + emojiObject.emoji);
      setShowEmojiPicker(false)

      // Optionally send emoji as a message (if required)
      // const res = await axios.post(
      //   `http://localhost:4000/api/v1/message/send/${selectedUser?._id}`,
      //   { message: emojiObject.emoji }, // Send emoji as a message
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     withCredentials: true,
      //   }
      // );

      // if (res.data.success) {
      //   dispatch(setMessages([...messages, res.data.newMessage]));
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent empty messages

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/message/send/${selectedUser?._id}`,
        { message }, // Send the message
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setMessage(""); // Clear input field
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <form className="flex items-center" onSubmit={submitHandler}>
        <div className="relative w-full flex gap-2">
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="bg-gray-500 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            😀
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-10 bg-white shadow-lg rounded-lg p-2">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Input Field */}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="w-full py-2 px-4 text-sm bg-gray-700 text-white border border-zinc-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />

          {/* Send Button */}
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
