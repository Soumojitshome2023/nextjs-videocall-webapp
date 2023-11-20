"use client"
import React from 'react'
import Reg from '../style/Reg.module.css'

export default function Regpage({ setRoom, setEmail, email, room, handleSubmitForm }) {
    return (
        <div className={Reg.main}>
            <div className={Reg.loginbox}>
                <h2>Welcome</h2>

                <div className={Reg.userbox}>
                    <input type="email" name="email" id="email" required="" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className={Reg.userbox}>
                    <input type="text" name="code" id="code" required="" value={room}
                        onChange={(e) => setRoom(e.target.value)} />
                    <label htmlFor="code">Room Code</label>
                </div>
                <button onClick={handleSubmitForm}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Create Room
                </button>

            </div>
        </div>

    )
}
