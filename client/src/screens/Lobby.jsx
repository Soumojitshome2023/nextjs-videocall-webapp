"use client"
import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Regpage from "@/components/RegPage";
import { MyContext } from "../context/SocketProvider";
// import io from 'socket.io-client';

// const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

const LobbyScreen = () => {
  // const [email, setEmail] = useState("");
  // const [room, setRoom] = useState("");
  const [GenRoomId, setGenRoomId] = useState('');
  const [ConnectionBtnText, setConnectionBtnText] = useState('Click to Connect');

  const Context = useContext(MyContext);
  const { socket } = Context;

  // const [remoteSocketId, setRemoteSocketId] = useState(null);
  const router = useRouter();
  const [roomCode, setroomCode] = useState('');

  // ========================= Step 2 =========================
  const handleSubmitForm = () => {
    console.log("My Id: ", socket.id);
    socket.emit('Send_RoomJoin_Req', roomCode);
  }

  // ========================= Step 5 =========================
  const handleRoomJoinWait = useCallback(
    (room) => {
      setConnectionBtnText('Please Wait');
    },
    [router]
  );

  // ========================= Step 6 =========================
  const handleRoomJoined = useCallback((remoteId) => {
    router.push(`/room/${remoteId}`);
  }, []);

  // ========================= Step 4 =========================
  useEffect(() => {
    socket.on("User_Join", handleRoomJoined);
    socket.on("Room Join Wait", handleRoomJoinWait);

    socket.on('Generate Room Code', (uniqueCode) => {
      console.log('Generate Room Code', uniqueCode);
      setGenRoomId(uniqueCode);
    });

    socket.on('Room Not Found', (userId) => {
      console.log("Room Not Found");
      setConnectionBtnText('Room Not Found');
    });
    return () => {
      socket.off("User_Join", handleRoomJoined);
      socket.off("Room Join Wait", handleRoomJoinWait);
      socket.off('Generate Room Code');
      socket.off('Room Not Found');
    };
  }, [socket]);


  return (
    <div>
      {/* ========================= Step 1 ========================= */}
      <Regpage GenRoomId={GenRoomId} setRoom={setroomCode} room={roomCode} handleSubmitForm={handleSubmitForm} ConnectionBtnText={ConnectionBtnText} />
    </div>
  );
};

export default LobbyScreen;
