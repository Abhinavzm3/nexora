import React from 'react';
import MessageContainer from './MessageContainer';
import Sidebar from './Sidebar';

const HomePage = () => {
  return (
    <div className="flex justify-center  items-center  bg-gray-800 p-4">
      <div className="flex flex-row w-full h-[650px] rounded-lg overflow-hidden bg-gray-700 shadow-lg">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
