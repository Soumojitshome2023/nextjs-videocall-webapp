"use client";
import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const MyContext = createContext();

export function DataSet() {
  const [remoteUuid, setremoteUuid] = useState(null);
  const [MyUuid, setMyUuid] = useState(uuidv4());
  const [peerConnection, setPeerConnection] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000"
    );
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  return {
    socket,
    peerConnection,
    setPeerConnection,
    remoteUuid,
    setremoteUuid,
    MyUuid,
    setMyUuid,
  };
}

const MyContextProvider = ({ children }) => {
  const data = DataSet();
  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
