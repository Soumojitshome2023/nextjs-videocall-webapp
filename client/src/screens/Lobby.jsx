"use client"
import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Regpage from "@/components/RegPage";
import { MyContext } from "../context/SocketProvider";
// import { v4 as uuidv4 } from 'uuid';

const LobbyScreen = () => {

  const [GenRoomId, setGenRoomId] = useState('');
  const [ConnectionBtnText, setConnectionBtnText] = useState('Click to Connect');

  const Context = useContext(MyContext);
  const { socket, remoteUuid, setremoteUuid, MyUuid, setMyUuid } = Context;

  const router = useRouter();
  const [roomCode, setroomCode] = useState('');

  // ========================= Step 4 =========================
  const handleSubmitForm = () => {
    // const Myuid = uuidv4();
    console.log("My Id1: ", MyUuid);
    socket.emit('Send_RoomJoin_Req', { roomCode: roomCode, uuid: MyUuid });
    // setMyUuid(Myuid);
  }

  // ========================= Step 6 =========================
  const handleRoomJoinWait = (id) => {

    console.log("change")
    setConnectionBtnText('Please Wait');
  }
  // [router]
  // );

  // ========================= Step 7 =========================
  const handleRoomJoined = useCallback((remoteid) => {
    // console.log("Remote Id1: ", remoteId);
    // setRemoteSocketId(remoteId);
    // router.push(`/room/${remoteId}`);
    setremoteUuid(remoteid);
  }, []);

  useEffect(() => {
    if (remoteUuid) {
      console.log("My UUID: ", MyUuid)
      console.log("Remote UUID: ", remoteUuid)
      router.push(`/room/`);
    }
  }, [remoteUuid])

  const Generate_Room_Code_Req = () => {
    socket.emit('Generate_Room_Code_Req', socket.id);
  }


  useEffect(() => {
    // ========================= Step 2 =========================
    socket.on("User_Join", handleRoomJoined);
    socket.on("Room Join Wait", handleRoomJoinWait);
    // socket.on("Room Join Wait", (asd) => {
    //   console.log("GET")
    // });

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
      // socket.off("Room Join Wait");
      socket.off('Generate Room Code');
      socket.off('Room Not Found');
    };
  }, [socket]);


  return (
    <div>
      {/* ========================= Step 3 ========================= */}
      <Regpage GenRoomId={GenRoomId} setRoom={setroomCode} room={roomCode} handleSubmitForm={handleSubmitForm} Generate_Room_Code_Req={Generate_Room_Code_Req} ConnectionBtnText={ConnectionBtnText} />
    </div>
  );
};

export default LobbyScreen;
