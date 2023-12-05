"use client"
import React from 'react'
import Reg from '../style/Reg.module.css'

export default function Regpage({ GenRoomId, Generate_Room_Code_Req, ConnectionBtnText, setRoom, room, handleSubmitForm }) {
    return (
        <div className={Reg.main}>
            <div className={Reg.loginbox}>
                <h2>Welcome</h2>
                {GenRoomId && <h2>Room Id : {GenRoomId}</h2>}
                <button onClick={Generate_Room_Code_Req}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Genrate Room Code
                </button>
                <div className={Reg.userbox}>
                    <input type="text" name="code" id="code" required="" value={room}
                        onChange={(e) => setRoom(e.target.value)} />
                    <label htmlFor="code">Enter Room Code</label>

                </div>

                <button onClick={handleSubmitForm}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    {ConnectionBtnText}
                </button>

            </div>
        </div>

    )
}
