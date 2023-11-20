"use client"
import React, { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import Regpage from "@/components/RegPage";


const LobbyScreen = () => {
  const [uniqueId, setUniqueId] = useState(null);

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
    setUniqueId(uniqueId);
  };

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  // const navigate = useNavigate();
  const router = useRouter();

  // New unique id
  const unique_id = uuid();

  // Get first 8 characters using slice
  const small_id = unique_id.slice(0, 8);


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

  return (
    <div>
      {/* <h2>Unique ID</h2>
      {uniqueId &&
        <p>{uniqueId}</p>}
      <button onClick={generateUniqueIdWithTimestamp}>Generate</button> */}

      {/* <h1>Lobby</h1> */}
      <Regpage setEmail={setEmail} email={email} setRoom={setRoom} room={room} handleSubmitForm={handleSubmitForm} />
    </div>
  );
};

export default LobbyScreen;
