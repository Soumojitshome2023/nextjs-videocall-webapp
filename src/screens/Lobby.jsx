"use client"
import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
// import { v4 as uuid } from "uuid";
import Regpage from "@/components/RegPage";


const LobbyScreen = () => {
  // const [uniqueId, setUniqueId] = useState(null);

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generateUniqueIdWithTimestamp = () => {
    const timestamp = new Date().getTime();
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 9; // Adjust the length of the alphanumeric portion as needed
    // let uniqueId = 'ID_' + timestamp + '_';
    let uniqueId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumeric.length);
      uniqueId += alphanumeric.charAt(randomIndex);
    }
    // setUniqueId(uniqueId);
    setIsCopied(false)
    setRoom(uniqueId);
  };


  const socket = useSocket();
  // const navigate = useNavigate();
  const router = useRouter();

  // New unique id
  // const unique_id = uuid();

  // // Get first 8 characters using slice
  // const small_id = unique_id.slice(0, 8);


  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      // navigate(`/room/${room}`);
      router.push(`/room/${room}`);
      // router.push('/room');
    },
    [router]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(room)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error('Copy failed: ', error);
      });
  };


  return (
    <div>
      {/* <h2>Unique ID</h2>
      {uniqueId &&
        <p>{uniqueId}</p>}
      <button onClick={generateUniqueIdWithTimestamp}>Generate</button> */}

      {/* <h1>Lobby</h1> */}
      <Regpage setEmail={setEmail} email={email} setRoom={setRoom} room={room} handleSubmitForm={handleSubmitForm} generateUniqueIdWithTimestamp={generateUniqueIdWithTimestamp} copyToClipboard={copyToClipboard} isCopied={isCopied} />
    </div>
  );
};

export default LobbyScreen;
