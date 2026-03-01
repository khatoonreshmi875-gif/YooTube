import { io } from "socket.io-client";

// Connect to your backend server
const socket = io("http://localhost:8000", {
  transports: ["websocket"], // prefer WebSocket
  autoConnect: true,
});

export default socket;
