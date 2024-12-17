import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import EmojiPicker from "emoji-picker-react";

const SendInput = () => {
  const audio = new Audio("/tones/happy-pop-3-185288.mp3");

  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);
  const { selectedUser } = useSelector((store) => store.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // URL for uploaded image
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  // Handle Emoji Selection
  const onEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Handle Location Sharing
  const shareLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `https://www.google.com/maps?q=${latitude},${longitude}`;

        const newMessage = {
          message: locationMessage,
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
            audio.volume = 0.8;
            audio.play().catch((error) => {
              console.error("Error playing sound:", error);
            });
          }
        } catch (error) {
          console.error("Error sending location:", error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        setLoading(false);
      }
    );
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
        audio.volume = 0.8;
        audio.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
        setUploaded(false);
        setMessage(""); // Clear the input field
        setImageUrl(""); // Clear the image URL
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const handleImageUpload = async () => {
      if (!selectedImage) return;
      setLoading(true);

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
        setLoading(false);
        setUploaded(true);
        setImageUrl(data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    handleImageUpload();
  }, [selectedImage]);

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <form className="flex items-center gap-3" onSubmit={submitHandler}>
        <div className="w-full flex items-center gap-4">
          {/* Image Upload */}
          {!imageUrl && (
            <div className="flex items-center gap-3">
              <label
                htmlFor="file-input"
                className="cursor-pointer flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-700 text-white focus:outline-none"
              >
                📁
              </label>

              <input
                id="file-input"
                type="file"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="file-input hidden border rounded-lg px-3 py-2 bg-gray-700 text-white focus:outline-none"
              />
            </div>
          )}

          {loading && <div>Wait..</div>}
          {uploaded && <div>Uploaded</div>}

          {/* Location Sharing Button */}
          <button
            type="button"
            onClick={shareLocation}
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-400 transition"
            disabled={loading}
          >
            <IoLocationSharp />
          </button>

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
            <div className="absolute bottom-16 left-80 z-10 bg-white shadow-lg rounded-lg p-2">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Input Field */}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="w-full py-2 px-4 text-sm bg-gray-700  text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
