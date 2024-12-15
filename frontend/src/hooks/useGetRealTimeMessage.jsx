import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socket);

  useEffect(() => {
    // Check if socket exists
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        // Update messages using a function to get the current state
        dispatch((prevState) => setMessages((messages) => [...messages,newMessage]));
      });

      // Cleanup the event listener when the component unmounts or socket changes
      return () => {
        socket.off('newMessage');
      };
    }
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
