"use client"
import React from 'react'
import "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {BiMessageAltEdit} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"


import { newSendfunction } from "@/app/utils/firestore";

const SendReply = ({activeAccount, receiver="" }) => {
    const [reply, setReply] = useState("Send Message")
    const [isNewMessage, setIsNewMessage] = useState(false)
    const [toAddress, setToAddress] = useState()



    const handleSendMessage = (e) =>{
        e.preventDefault()
        console.log("sending message")
        
        // add dynamic to variable
        newSendfunction(receiver, activeAccount, reply)
        setReply("Send Message")
    }


    const handleShowToInput = (e) =>{
        e.preventDefault()
        setIsNewMessage(!isNewMessage)
    }


    
  return (
    <form className="" onSubmit={e=>handleSendMessage(e)}>

    <br />
    <div className="flex">
            
        <input className="" onChange={e=>setReply(e.target.value)} placeholder={reply}/>
        <button onClick={e=>handleSendMessage(e)} type="submit" >Send Message</button>
    </div>
</form>
  )
}

export default SendReply