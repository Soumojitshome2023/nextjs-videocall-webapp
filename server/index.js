// const { Server } = require("socket.io");
import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const existingCodes = [];
const Room = {}
const Users = {}

function getKeyByValue(object, value) {
  for (let key in object) {
    if (object[key] === value) {
      return key;
    }
  }
  return null;
}


io.on("connection", (socket) => {
  console.log("New User========================")
  console.log("existingCodes: ", existingCodes);
  console.log("Room: ", Room);
  console.log("Users: ", Users);
  // ========================= Step 1 =========================
  console.log(`Socket Connected: ${socket.id}`);
  let uniqueCode;
  // io.to(socket.id).emit('Generate Room Code', uniqueCode);

  socket.on("Generate_Room_Code_Req", (uid) => {
    uniqueCode = generateUniqueCode();
    io.to(socket.id).emit('Generate Room Code', uniqueCode);
  })

  // ========================= Step 5 =========================
  socket.on("Send_RoomJoin_Req", ({ roomCode, uuid }) => {
    if (existingCodes.includes(roomCode)) {
      io.to(socket.id).emit("Room Join Wait", roomCode);
      // console.log("Wait==============");
      Users[uuid] = socket.id;

      if (Room[roomCode]) {
        console.log("existingCodes: ", existingCodes);
        io.to(Users[Room[roomCode]]).emit("User_Join", uuid);
        io.to(socket.id).emit("User_Join", Room[roomCode]);

        // console.log(Room);
        const indexToRemove = existingCodes.indexOf(roomCode);
        if (indexToRemove !== -1) {
          existingCodes.splice(indexToRemove, 1);
        }
        delete Room.roomCode;
      }
      else {
        Room[roomCode] = uuid;
      }
    }
    else {
      io.to(socket.id).emit('Room Not Found', socket.id);
    }
  });

  // ========================= Step 15 =========================
  socket.on("EndStream", (remoteuid) => {
    io.to(Users[remoteuid]).emit("EndStream", socket.id);
    // console.log(`1 Id: ${remoteid} Socket id: ${socket.id}`)

  });
  socket.on("ReAdd_Id", (MyUuid) => {
    Users[MyUuid] = socket.id;
    console.log(Users);
  });


  // ========================= Step 10 =========================
  socket.on("Send_Offer", ({ to, Offer }) => {
    // Users[from] = socket.id;
    io.to(Users[to]).emit("Get_Offer", Offer);
    // console.log(`1 Id: ${remoteId} Socket id: ${socket.id}`)
  });

  // ========================= Step 12 =========================
  socket.on("Send_Ans", ({ to, Ans }) => {
    io.to(Users[to]).emit("Get_Ans", Ans);
    // console.log(`2 Id: ${id} Socket id: ${socket.id}`)
  });

  socket.on('disconnect', () => {
    let key = getKeyByValue(Users, socket.id);
    delete Users[key];
    console.log("=======================================")
    console.log("existingCodes: ", existingCodes);
    console.log("Room: ", Room);
    console.log("Users: ", Users);
    console.log("=======================================")
    // console.log(Room);
    // const indexToRemove = existingCodes.indexOf(uniqueCode);
    // if (indexToRemove !== -1) {
    //   existingCodes.splice(indexToRemove, 1);
    // }
  });
});

console.log("Server Run");


// ============================ Room Code Generate ============================
function generateUniqueCode() {
  let code = generateCode();

  while (codeAlreadyExists(code)) {
    // console.log("old" + code)
    code = generateCode();
    // console.log("new" + code)
  }
  existingCodes.push(code);
  return code;
}
function generateCode() {
  return (Math.floor(Math.random() * 900) + 100).toString();
  // return (Math.floor(Math.random() * 10)).toString();
}
function codeAlreadyExists(code) {
  return existingCodes.includes(code);
}