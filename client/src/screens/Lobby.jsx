"use client"
import React, { useState, useCallback, useContext, useEffect } from "react";
import CreateLink from "@/components/CreateLink";
import { v4 as uuidv4 } from 'uuid';

const LobbyScreen = () => {

  const [GenRoomId, setGenRoomId] = useState('');

  const CreateRoomCode = () => {
    const id = uuidv4();
    setGenRoomId(id);
  }

  return (
    <div>
      <CreateLink GenRoomId={GenRoomId} CreateRoomCode={CreateRoomCode} />
    </div>
  );
};

export default LobbyScreen;
