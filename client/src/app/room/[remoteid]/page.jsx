"use client"
import React, { useEffect, useCallback, useContext, useState, useRef } from "react";
// import ReactPlayer from "react-player";
// import peer from "../../service/peer";
import { MyContext } from "../../../context/SocketProvider";
import roomstyle from '../../../style/Room.module.css'
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
// import io from 'socket.io-client';

// const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);

export default function RoomPage({ params }) {
  const { remoteid } = params;

  const router = useRouter();

  const Context = useContext(MyContext);
  const { socket } = Context;

  const [StartFuncRun, setStartFuncRun] = useState(false)
  const user1VideoRef = useRef(null);
  const user2VideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const [Mystream, setMystream] = useState(null);

  // const [roomCode, setroomCode] = useState('');

  // =============================== Init ===============================
  // =========================== Step 1 ===========================
  const init = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const pc = new RTCPeerConnection();
        // setPeerConnection(pc);
        peerConnectionRef.current = pc;
        console.log("My Id: ", socket.id);

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
        resolve(pc);

      } catch (error) {
        console.log("Error : " + error);
        reject(error);
      }
    });
  };

  // =========================== Step 3 ===========================
  // const start = () => {
  //   socket.emit('Send_RoomJoin_Req', roomCode);
  // }



  // =========================== Create Offer ===========================
  // =========================== Step 5 ===========================
  const createOffer = async (id) => {
    console.log("Create Offer");
    // console.log(`remoteid: ${remoteId}`)
    let run = false;
    peerConnectionRef.current.onicecandidate = async (event) => {
      if (event.candidate) {
        const Offer = JSON.stringify(peerConnectionRef.current.localDescription);
        if (!run) {
          socket.emit('Send_Offer', { remoteId: id, Offer });
          // console.log('Send_Offer run');
          run = true;
        }
      }
    };

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
  };

  // =========================== Create Answer ===========================
  // =========================== Step 7 ===========================
  const createAnswer = useCallback(async ({ id, Offer }) => {
    console.log("Create Ans");
    const receivedOffer = JSON.parse(Offer);
    // console.log("Offer: ", receivedOffer)
    let run = false;
    peerConnectionRef.current.onicecandidate = async (event) => {
      if (event.candidate) {
        if (!run) {
          // console.log('Adding answer candidate...:', event.candidate);
          const Ans = JSON.stringify(peerConnectionRef.current.localDescription);
          socket.emit('Send_Ans', { id, Ans });
          run = true;
        }
      }
    };
    await peerConnectionRef.current.setRemoteDescription(receivedOffer);

    const answer = await peerConnectionRef.current.createAnswer();
    await peerConnectionRef.current.setLocalDescription(answer);
  }, []);

  // =========================== Add Answer ===========================
  // =========================== Step 9 ===========================
  const addAnswer = useCallback(async (Ans) => {
    console.log("Add Ans");
    const receivedAnswer = JSON.parse(Ans);
    // console.log('Add answer triggered');
    // console.log('answer:', receivedAnswer);
    if (!peerConnectionRef.current.remoteDescription) {
      peerConnectionRef.current.setRemoteDescription(receivedAnswer);
    }
  }, []);

  useEffect(() => {
    if (!StartFuncRun) {
      Start();
      setStartFuncRun(true);
    }
    // createOffer(remoteid);
    // socket.on("User_Join", createOffer);
    // socket.emit("Got_Room", socket.id);
    socket.on("Get_Offer", createAnswer);
    socket.on("Get_Ans", addAnswer);
    socket.on("EndStream", (id) => {
      Swal.fire({
        icon: "error",
        title: "Call End",
        text: "Call End",
      });
    });
    return () => {
      // socket.off("User_Join", createOffer);
      socket.off("Get_Offer", createAnswer);
      socket.off("Get_Ans", addAnswer);
      socket.off("EndStream");
    }
  }, [socket]);


  const Start = async () => {
    await init();
    const string1 = socket.id;
    const string2 = remoteid;

    const result = string1.localeCompare(string2);

    if (result < 0) {
      // console.log(`${string1} comes before ${string2}`);
      createOffer(remoteid);
      // return 1;
    } else if (result > 0) {
      // console.log(`${string1} comes after ${string2}`);
      // return 0;
    } else {
      console.log(`${string1} is equal to ${string2}`);
    }
  }


  const endStream = async () => {

    const tracks = Mystream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    setMystream(null);
    socket.emit("EndStream", remoteid);
    router.push('/');
  }

  // ========================================================================

  return (
    <div>
      <div className={roomstyle.Main}>
        {/* <h4 className={roomstyle.heading}>{remoteSocketId ? "Connected" : "Please Wait..."}</h4> */}

        <div className={roomstyle.buttons}>

          {/* ========================= Step 7 ========================= */}
          {/* {remoteSocketId && */}

          <button className={roomstyle.button} onClick={endStream}>
            <span className={roomstyle.button_lg}>
              <span className={roomstyle.button_sl}></span>
              <span className={roomstyle.button_text}>End Stream</span>
            </span>
          </button>

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
