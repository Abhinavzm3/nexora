import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Utility to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Map to track userId and their corresponding socketId
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    console.log(`User Connected: ${userId}, Socket ID: ${socket.id}`);
  }

  // Emit the list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));








   // Handle call initiation
   socket.on("call-user", ({ offer, targetUserId }) => {
    const targetSocketId = getReceiverSocketId(targetUserId);
    if (targetSocketId) {
      io.to(targetSocketId).emit("receive-call", { offer, from: userId });
    }
  });

  // Handle call answer
  socket.on("answer-call", ({ answer, callerId }) => {
    const callerSocketId = getReceiverSocketId(callerId);
    if (callerSocketId) {
      io.to(callerSocketId).emit("call-answered", { answer });
    }
  });

  // Handle ICE candidate exchange
  socket.on("ice-candidate", ({ candidate, targetUserId }) => {
    const targetSocketId = getReceiverSocketId(targetUserId);
    if (targetSocketId) {
      io.to(targetSocketId).emit("ice-candidate", { candidate });
    }
  });









  
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(`User Disconnected: ${userId}, Socket ID: ${socket.id}`);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, io, server };
