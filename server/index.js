// const { Server } = require("socket.io");
import { Server } from "socket.io";
import express from 'express';
import http from "http";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import dotenv from 'dotenv';
dotenv.config();

const dbconnect=async()=>{
   try {
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("connected to database");
   } catch (error) {
      throw error;
   }
}

const app=express();
const PORT=8000;
const server=http.createServer(app);

app.use(express.json());
//auth api

app.use("/api",authRouter)


const io = new Server(server, {
  cors: true,
});

// const RoomU1 = {};
// const RoomU2 = {};

io.on("connection", (socket) => {

  console.log(`Socket Connected: ${socket.id}`);
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

  //;

});

server.listen(PORT,()=>{
  dbconnect();
  console.log("Server Start");
})

