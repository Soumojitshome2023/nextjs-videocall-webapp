const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});

const existingCodes = [];
const Room = {}

function getKeyByValue(object, value) {
  for (let key in object) {
    if (object[key] === value) {
      return key;
    }
  }
  return null;
}


io.on("connection", (socket) => {
  console.log("existingCodes: ", existingCodes);
  console.log("Room: ", Room);
  // ========================= Step 1 =========================
  console.log(`Socket Connected: ${socket.id}`);
  const uniqueCode = generateUniqueCode();
  io.to(socket.id).emit('Generate Room Code', uniqueCode);

  // ========================= Step 5 =========================
  socket.on("Send_RoomJoin_Req", (roomCode) => {

    if (existingCodes.includes(roomCode)) {
      io.to(socket.id).emit("Room Join Wait", roomCode);
      // console.log("Socket Id : ", socket.id);
      if (Room[roomCode]) {
        io.to(Room[roomCode]).emit("User_Join", socket.id);
        io.to(socket.id).emit("User_Join", Room[roomCode]);
        delete Room.roomCode;
      }
      else {
        Room[roomCode] = socket.id;
      }
    }
    else {
      io.to(socket.id).emit('Room Not Found', socket.id);
    }
  });

  // ========================= Step 15 =========================
  socket.on("EndStream", (remoteid) => {
    io.to(remoteid).emit("EndStream", socket.id);
    console.log(`1 Id: ${remoteid} Socket id: ${socket.id}`)

  });


  // ========================= Step 10 =========================
  socket.on("Send_Offer", ({ remoteId, Offer }) => {
    io.to(remoteId).emit("Get_Offer", { id: socket.id, Offer });
    // console.log(`1 Id: ${remoteId} Socket id: ${socket.id}`)
  });

  // ========================= Step 12 =========================
  socket.on("Send_Ans", ({ id, Ans }) => {
    io.to(id).emit("Get_Ans", Ans);
    // console.log(`2 Id: ${id} Socket id: ${socket.id}`)
  });

  socket.on('disconnect', () => {
    let key = getKeyByValue(Room, socket.id);
    delete Room[key];
    // console.log(Room);
    const indexToRemove = existingCodes.indexOf(uniqueCode);
    if (indexToRemove !== -1) {
      existingCodes.splice(indexToRemove, 1);
    }
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