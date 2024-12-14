import React from 'react'
import MessageContainer from './MessageContainer'
import Sidebar from './Sidebar'

const HomePage = () => {
  return (
    <div className='felx flex-row sm:h-[450px] md:h-[550px] rounded-lg overflow bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0'>
      <Sidebar></Sidebar>
      <MessageContainer></MessageContainer>
    </div>
  )
}

export default HomePage
