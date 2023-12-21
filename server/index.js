// const { Server } = require("socket.io");
import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const Room = {}

io.on("connection", (socket) => {

  // console.log(`Socket Connected: ${socket.id}`);
  socket.on("Send_RoomJoin_Req", ({ roomCode, uuid }) => {
    
    if (Room[roomCode] && Room[roomCode] != uuid) {
      io.emit("User_Join", { to: Room[roomCode], remote: uuid });
      io.emit("User_Join", { to: uuid, remote: Room[roomCode] });
      delete Room[roomCode]
    }
    else {
      Room[roomCode] = uuid;
    }
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

console.log("Server Start");