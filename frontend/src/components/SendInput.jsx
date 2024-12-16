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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // URL for uploaded image
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!selectedImage) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "nexora-chat");
    formData.append("cloud_name", "df9t8sdnq"); // Your cloud name

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/df9t8sdnq/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("Uploaded Image URL:", data.secure_url);

      setImageUrl(data.secure_url); // Save the uploaded image URL
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Handle Emoji Selection
  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Handle Form Submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim() && !imageUrl) return; // Prevent empty messages or no image upload

    const newMessage = {
      message,
      imageUrl, // Send image URL if available
    };

    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/message/send/${selectedUser?._id}`,
        newMessage,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setMessage(""); // Clear the input field
        setImageUrl(""); // Clear the image URL
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <form className="flex items-center gap-3" onSubmit={submitHandler}>
        <div className="w-full flex items-center gap-4">
          {/* Image Upload */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              // accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="file-input border rounded-lg px-3 py-2 bg-gray-700 text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send 
            </button>
          </div>

          {/* Image Preview */}
          {/* {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="uploaded"
                className="w-20 h-20 object-cover border rounded-lg"
              />
            </div>
          )} */}

          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 transition"
          >
            😀
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-0 z-10 bg-white shadow-lg rounded-lg p-2">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Input Field */}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="w-full py-2 px-4 text-sm bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="text-xl text-blue-500 hover:text-blue-600 transition duration-200"
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInput;
