import React from 'react'
import Message from './Message'
import UseGetMessages from '../hooks/UseGetMessages'
const Messages = () => {

  UseGetMessages()
  return (
    <div className='px-4 flex-1 overflow-auto'>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      <Message></Message>
      
     
    </div>
  )
}

export default Messages
