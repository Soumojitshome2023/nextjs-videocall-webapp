// src/app/socket.js
import { io } from "socket.io-client";

// Create a socket connection to the server
const socket = io("http://localhost:8000", {
  transports: ["websocket"],
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"],
  },
});

export default socket;
