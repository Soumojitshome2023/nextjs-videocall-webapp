// const { Server } = require("socket.io");
import { Server } from "socket.io";
import http from "http";

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // or your client's URL
    methods: ["GET", "POST"],
  },
});

// ... rest of your server code ...

httpServer.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

// const RoomU1 = {};
// const RoomU2 = {};

io.on("connection", (socket) => {
  // console.log(`Socket Connected: ${socket.id}`);
  // socket.on("Send_RoomJoin_Req", ({ roomCode, uuid }) => {

  //   if (RoomU1[roomCode] && RoomU1[roomCode] != uuid) {
  //     // RoomU2[roomCode] = uuid;
  //     io.emit("User_Join", { to: RoomU1[roomCode], remote: uuid });
  //     io.emit("User_Join", { to: uuid, remote: RoomU1[roomCode] });
  //     // RoomU1[roomCode] = uuid;
  //     // delete Room[roomCode];
  //   }
  //   else {
  //     RoomU1[roomCode] = uuid;
  //   }
  // });
  socket.on("Send_RoomJoin_Req", ({ roomCode, uuid }) => {
    // if (!RoomU1[roomCode] || RoomU1[roomCode] != uuid) {
    io.emit("Get_Available", { from: uuid, roomCode: roomCode });
    // RoomU1[roomCode] = uuid;
    // }
  });

  socket.on("Send_Available", ({ roomCode, to, uuid }) => {
    io.emit("User_Join", { to: to, remote: uuid });
    io.emit("User_Join", { to: uuid, remote: to });
    // delete RoomU1[roomCode];
  });

  socket.on("EndStream", ({ to }) => {
    io.emit("EndStream", { to });
  });

  socket.on("Send_Offer", ({ to, from, Offer }) => {
    io.emit("Get_Offer", { to: to, from, Offer });
  });

  socket.on("Send_Ans", ({ to, from, Ans }) => {
    io.emit("Get_Ans", { to: to, Ans });
  });

  // socket.on('disconnect', () => {
  // });
});

httpServer.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});

console.log("Server Start");
