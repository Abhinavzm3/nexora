import React from 'react';
import { IoSend } from 'react-icons/io5';

const SendInput = () => {
  return (
    <div className="p-4">
      <form className="flex items-center">
        <div className="relative w-full">
          <input
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
