import React from 'react';
import MessageContainer from './MessageContainer';
import Sidebar from './Sidebar';

const HomePage = () => {
  return (
   
      <div className="flex mx-32 flex-row w-full h-[650px] rounded-lg overflow-hidden bg-gray-700 shadow-lg">
        <Sidebar />
        <MessageContainer />
      </div>
    
  );
};

export default HomePage;
