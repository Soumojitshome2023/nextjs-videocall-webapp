"use client"
import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../../service/peer";
import { useSocket } from "../../../context/SocketProvider";
// import RoomPageDesign from '@/components/RoomPageDesign'
import room from '../../../style/Room.module.css'
import { useRouter } from "next/navigation";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const router = useRouter();



  // ==================================== Join ====================================
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  // ==================================== Call ====================================
  const handleCallUser = useCallback(async () => {
    // const stream = await navigator.mediaDevices.getUserMedia({
    //   audio: true,
    //   video: true,
    // });
    // setMyStream(stream);
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  // ==================================== Incomming ==================================== 
  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   audio: true,
      //   video: true,
      // });
      // setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      // sendStreams();
    },
    [socket]
  );

  // ==================================== Send Stream ====================================
  const sendStreams = async () => {
    console.log("Send Streams")
    if (remoteSocketId) {
      handleCallUser()
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    if (stream) {
      for (const track of stream.getTracks()) {
        peer.peer.addTrack(track, stream);
      }
    }
  }


  const endStream = async () => {
    const tracks = myStream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    setMyStream(null);
    router.push('/');
  }

  // ==================================== Accepted ====================================
  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      // sendStreams();
    },
    [sendStreams]
  );

  // ========================================================================
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  // ========================================================================
  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  // ========================================================================
  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  // ========================================================================

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  // ========================================================================

  return (
    <div>
      {/* <RoomPageDesign /> */}
      {/* <h1>Room Page</h1> */}
      {/* <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4> */}

      <div className={room.Main}>

        <div className={room.buttons}>

          {/* {myStream && */}
          {remoteSocketId &&
            <>
              {myStream ?
                <button className={room.button} onClick={endStream}>
                  <span className={room.button_lg}>
                    <span className={room.button_sl}></span>
                    <span className={room.button_text}>End Stream</span>
                  </span>
                </button>

                :
                <button className={room.button} onClick={sendStreams}>
                  <span className={room.button_lg}>
                    <span className={room.button_sl}></span>
                    <span className={room.button_text}>Start Stream</span>
                  </span>
                </button>
              }
            </>
          }
          {/* } */}
          {/* {remoteSocketId &&
            <button className={room.button} onClick={handleCallUser}>
              <span className={room.button_lg}>
                <span className={room.button_sl}></span>
                <span className={room.button_text}>CALL</span>
              </span>
            </button>
          } */}
        </div>
        {/* <div>RoomPage</div> */}
        <div className={room.remotebox}>
          {remoteStream && (
            <>
              {/* <h1>Remote Stream</h1> */}
              <ReactPlayer
                playing
                
                height="100%"
                width="100%"
                url={remoteStream}
                className={room.mirroredPlayer}
              />
            </>
          )}

        </div>

        <div className={room.currentbox}>
          {myStream && (
            <>
              {/* <h1>My Stream</h1> */}
              <ReactPlayer
                playing
                muted
                height="100%"
                width="100%"
                url={myStream}
                className={room.mirroredPlayer}
              />
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default RoomPage;
