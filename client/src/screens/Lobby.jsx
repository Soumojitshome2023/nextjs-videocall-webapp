"use client"
import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useRouter } from "next/navigation";
import Regpage from "@/components/RegPage";


const LobbyScreen = () => {

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [GenRoomId, setGenRoomId] = useState('');
  const [ConnectionBtnText, setConnectionBtnText] = useState('Click to Connect');

  const socket = useSocket();
  const router = useRouter();

  // ========================= Step 2 =========================
  const handleSubmitForm = () => {
    socket.emit("room:join", room);
  }

  // ========================= Step 5 =========================
  const handleJoinRoom = useCallback(
    (room) => {
      router.push('/room');
    },
    [router]
  );

  // ========================= Step 4 =========================
  useEffect(() => {
    socket.on('Room Not Found', (userId) => {
      console.log("Room Not Found")
      setConnectionBtnText('Room Not Found');
    });
    socket.on("room:join", handleJoinRoom);

    socket.on('Generate Room Code', (uniqueCode) => {
      console.log('Generate Room Code', uniqueCode);
      setGenRoomId(uniqueCode);
    });
    
    return () => {
      socket.off("room:join", handleJoinRoom);
      socket.off('Generate Room Code');
      socket.off('Room Not Found');
    };
  }, [socket, handleJoinRoom]);



  return (
    <div>
      {/* ========================= Step 1 ========================= */}
      <Regpage setEmail={setEmail} GenRoomId={GenRoomId} email={email} setRoom={setRoom} room={room} handleSubmitForm={handleSubmitForm} ConnectionBtnText={ConnectionBtnText} />
    </div>
  );
};

export default LobbyScreen;
