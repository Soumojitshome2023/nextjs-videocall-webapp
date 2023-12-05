"use client"
import React, { useEffect, useCallback, useContext, useState, useRef } from "react";
import { MyContext } from "../../context/SocketProvider";
import roomstyle from '../../style/Room.module.css'
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function RoomPage() {

  const router = useRouter();

  const Context = useContext(MyContext);
  const { socket, remoteUuid, setremoteUuid, MyUuid } = Context;

  const [StartFuncRun, setStartFuncRun] = useState(false)
  const user1VideoRef = useRef(null);
  const user2VideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [Mystream, setMystream] = useState(null);


  // =============================== Init ===============================

  const init = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const pc = new RTCPeerConnection();
        peerConnectionRef.current = pc;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        user1VideoRef.current.srcObject = stream;
        setMystream(stream);
        const remoteStream = new MediaStream();
        user2VideoRef.current.srcObject = remoteStream;

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };
        socket.emit('ReAdd_Id', MyUuid);
        console.log("My UUID: ", MyUuid)
        console.log("Remote UUID: ", remoteUuid)
        console.log("My Socket Id: ", socket.id)


        resolve(pc);

      } catch (error) {
        console.log("Error : " + error);
        reject(error);
      }
    });
  };



  // =========================== Create Offer ===========================
  // =========================== Step 9 ===========================
  const createOffer = async (id) => {
    console.log("Create Offer");
    console.log(`remoteid: ${remoteUuid}`)
    let run = false;
    peerConnectionRef.current.onicecandidate = async (event) => {
      if (event.candidate) {
        const Offer = JSON.stringify(peerConnectionRef.current.localDescription);
        if (!run) {
          socket.emit('Send_Offer', { to: id, Offer });
          run = true;
        }
      }
    };

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
  };

  // =========================== Create Answer ===========================
  // =========================== Step 11 ===========================
  const createAnswer = useCallback(async (Offer) => {
    console.log("Create Ans");
    const receivedOffer = JSON.parse(Offer);
    let run = false;
    peerConnectionRef.current.onicecandidate = async (event) => {
      if (event.candidate) {
        if (!run) {
          const Ans = JSON.stringify(peerConnectionRef.current.localDescription);
          socket.emit('Send_Ans', { to: remoteUuid, Ans });
          run = true;
        }
      }
    };
    await peerConnectionRef.current.setRemoteDescription(receivedOffer);

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
  }, []);

  // =========================== Add Answer ===========================
  // =========================== Step 13 ===========================
  const addAnswer = useCallback(async (Ans) => {
    console.log("Add Ans");
    const receivedAnswer = JSON.parse(Ans);
    if (!peerConnectionRef.current.remoteDescription) {
      peerConnectionRef.current.setRemoteDescription(receivedAnswer);
    }
  }, []);

  // ========================= Step 8 =========================
  useEffect(() => {
    if (!StartFuncRun) {
      Start();
    }
    socket.on("Get_Offer", createAnswer);
    socket.on("Get_Ans", addAnswer);
    socket.on("EndStream", (id) => {
      user1VideoRef.current = null;
      user2VideoRef.current = null;
      setremoteUuid(null);
      router.push('/');
      
      Swal.fire({
        icon: "error",
        title: "Call End",
        text: "Call End",
      });
    });
    return () => {
      socket.off("Get_Offer", createAnswer);
      socket.off("Get_Ans", addAnswer);
      socket.off("EndStream");
    }
  }, [socket]);


  const Start = async () => {
    setStartFuncRun(true);
    console.log("Start Run")
    await init();
    const string1 = MyUuid;
    const string2 = remoteUuid;

    const result = string1.localeCompare(string2);

    if (result < 0) {
      // console.log(`${string1} comes before ${string2}`);
      createOffer(remoteUuid);
      // return 1;
    } else if (result > 0) {
      console.log(`${string1} comes after ${string2}`);
      // return 0;
    } else {
      console.log(`${string1} is equal to ${string2}`);
    }
  }

  // ========================= Step 14 =========================
  const endStream = async () => {
    const tracks = Mystream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    setMystream(null);
    user1VideoRef.current = null;
    user2VideoRef.current = null;
    socket.emit("EndStream", remoteUuid);
    setremoteUuid(null);
    router.push('/');
  }

  // ========================================================================

  return (
    <div>
      <div className={roomstyle.Main}>
        {/* <h4 className={roomstyle.heading}>{remoteSocketId ? "Connected" : "Please Wait..."}</h4> */}

        <div className={roomstyle.buttons}>

          {/* ========================= Step 7 ========================= */}

          <button className={roomstyle.button} onClick={endStream}>
            <span className={roomstyle.button_lg}>
              <span className={roomstyle.button_sl}></span>
              <span className={roomstyle.button_text}>End Stream</span>
            </span>
          </button>
          {/* <button className={roomstyle.button} onClick={Start}>
            <span className={roomstyle.button_lg}>
              <span className={roomstyle.button_sl}></span>
              <span className={roomstyle.button_text}>Start Stream</span>
            </span>
          </button> */}

          {/* } */}
        </div>
        <div className={roomstyle.remotebox}>

          <video style={{ width: '100%', height: '100%' }} ref={user2VideoRef} autoPlay playsInline />

        </div>

        <div className={roomstyle.currentbox}>

          <video style={{ width: '100%', height: '100%' }} ref={user1VideoRef} autoPlay muted playsInline />

        </div>

      </div>
    </div>
  );
};
