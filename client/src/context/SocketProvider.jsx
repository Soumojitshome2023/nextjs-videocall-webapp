"use client"
import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const MyContext = createContext();

export function DataSet() {

  // const [remoteSocketId, setRemoteSocketId] = useState(null);
  // const [room, setRoom] = useState("");
  const [peerConnection, setPeerConnection] = useState(null);

  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

  return {
    socket, peerConnection, setPeerConnection
  };
}

const MyContextProvider = ({ children }) => {
  const data = DataSet();
  return (
    <div>
      <MyContext.Provider value={data}>
        {children}
      </MyContext.Provider>
    </div>
  )
}

export default MyContextProvider;