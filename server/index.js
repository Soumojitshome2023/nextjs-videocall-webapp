const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});


const existingCodes = [];

io.on("connection", (socket) => {
  // ========================= Step 0 =========================
  console.log(`Socket Connected`, socket.id);
  const uniqueCode = generateUniqueCode();
  io.to(socket.id).emit('Generate Room Code', uniqueCode);
  console.log("uniqueCode: ", uniqueCode);

  // ========================= Step 3 =========================
  socket.on("room:join", (room) => {
    io.to(room).emit("user:joined", socket.id);
    if (existingCodes.includes(room)) {
      socket.join(room);
      io.to(socket.id).emit("room:join", room);
    }
    else {
      io.to(socket.id).emit('Room Not Found', socket.id);
    }
  });


  // ========================= Step 10 =========================
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  // ========================= Step 12 =========================
  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
    io.to(socket.id).emit("call:Done", to);
  });


  socket.on("peer:nego:needed", ({ to, offer }) => {
    // console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    // console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on('EndStream', function () {
    socket.disconnect();
    // console.log('it will disconnet connection');
  });



  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);

    console.log("Before Disconnect: ", existingCodes)
    const indexToRemove = existingCodes.indexOf(uniqueCode);
    if (indexToRemove !== -1) {
      existingCodes.splice(indexToRemove, 1);
    }
    console.log("After Disconnect: ", existingCodes)

  });

});


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