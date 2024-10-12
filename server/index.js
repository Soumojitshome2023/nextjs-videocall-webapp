import { Server } from "socket.io";

const io = new Server(8000, {
  cors: {
    origin: "http://your-client-url.com", // Replace with your client's URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  // Join room when a request is received
  socket.on("Send_RoomJoin_Req", ({ roomCode, uuid }) => {
    if (!roomCode || !uuid) {
      socket.emit("error", { message: "Invalid room or user ID" });
      return;
    }
    socket.join(roomCode);
    console.log(`${uuid} joined room ${roomCode}`);
    io.to(roomCode).emit("User_Join", { uuid });
  });

  // Handle availability, emit to specific users
  socket.on("Send_Available", ({ roomCode, to, uuid }) => {
    socket.to(to).emit("User_Join", { to: to, remote: uuid });
    socket.to(uuid).emit("User_Join", { to: uuid, remote: to });
  });

  // End stream event, sent to a specific user
  socket.on("EndStream", ({ to }) => {
    socket.to(to).emit("EndStream", { to });
  });

  // Handle offer sent between peers
  socket.on("Send_Offer", ({ to, from, Offer }) => {
    socket.to(to).emit("Get_Offer", { from, Offer });
  });

  // Handle answer sent between peers
  socket.on("Send_Ans", ({ to, from, Ans }) => {
    socket.to(to).emit("Get_Ans", { from, Ans });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Socket Disconnected: ${socket.id}`);
    // Add any cleanup or resource freeing here if necessary
  });
});

console.log("Server Started");
