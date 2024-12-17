// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';

// const VideoCall = ({ targetUserId }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   const [socket, setSocket] = useState(null); // Store socket in local state
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);

//   // Initialize socket connection when component mounts
//   useEffect(() => {
//     const socketInstance = io('http://localhost:4000'); // Connect to server
//     setSocket(socketInstance); // Store socket instance in local state

//     return () => {
//       socketInstance.disconnect(); // Clean up on component unmount
//     };
//   }, []);

//   // Set up the peer connection and user media
//   useEffect(() => {
//     if (!socket) return; // Don't run if socket isn't initialized

//     // Get user media (camera and microphone)
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setLocalStream(stream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }

//         // Create peer connection
//         const pc = new RTCPeerConnection({
//           iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//         });

//         pc.ontrack = (event) => {
//           setRemoteStream(event.streams[0]);
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };

//         pc.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.emit('ice-candidate', { candidate: event.candidate, targetUserId });
//           }
//         };

//         stream.getTracks().forEach((track) => {
//           pc.addTrack(track, stream);
//         });

//         setPeerConnection(pc);
//       });

//     return () => {
//       if (peerConnection) {
//         peerConnection.close();
//       }
//     };
//   }, [socket, targetUserId]); // Re-run effect when socket or targetUserId changes

//   // Start video call by sending an offer
//   const startCall = async () => {
//     if (!peerConnection) return;

//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);

//     // Emit the offer to the server
//     socket.emit('call-user', { offer, targetUserId });
//   };

//   // Handle incoming answer from the target user
//   useEffect(() => {
//     if (!socket || !peerConnection) return;

//     socket.on('call-accepted', async (answer) => {
//       await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.on('ice-candidate', (candidate) => {
//       peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });
//   }, [socket, peerConnection]);

//   // Handle incoming call (answer the call)
//   const answerCall = async (offer) => {
//     if (!peerConnection) return;

//     await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

//     const answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer);

//     // Emit the answer to the server
//     socket.emit('answer-call', { answer, targetUserId });
//   };

//   return (
//     <div>
//       <video ref={localVideoRef} autoPlay muted />
//       <video ref={remoteVideoRef} autoPlay />
//       <button onClick={startCall}>Start Call</button>
//     </div>
//   );
// };

// export default VideoCall;
