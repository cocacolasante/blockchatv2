"use client"
import React from 'react'
import "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {BiMessageAltEdit} from "react-icons/bi"
import {AiOutlineClose} from "react-icons/ai"


import { newSendfunction } from "@/app/utils/firestore";

const SendMessageButton = ({activeAccount, receiver="" }) => {
    const [reply, setReply] = useState("Send Message")
    const [isNewMessage, setIsNewMessage] = useState(false)
    const [toAddress, setToAddress] = useState()



    const handleSendMessage = (e) =>{
        e.preventDefault()
        console.log("sending message")
        
        // add dynamic to variable
        newSendfunction(toAddress, activeAccount, reply)
        setReply("Send Message")
    }

    const displayToInput = () =>{
        return(
            <div>
                <input placeholder='To' onChange={handleInputValidation} />
            </div>
        )
    }

    const handleShowToInput = (e) =>{
        e.preventDefault()
        setIsNewMessage(!isNewMessage)
    }

    const handleInputValidation = (e) =>{
        e.preventDefault()
        let toAddy = receiver ||  e.target.value.toString().toLowerCase()
        
        
        setToAddress(toAddy)
    }
    
  return (
    <form className="absolute bottom-0 m-auto" onSubmit={e=>handleSendMessage(e)}>

    {isNewMessage && displayToInput()}
    <br />
    <div className="flex">
    
        {!isNewMessage ? <BiMessageAltEdit onClick={handleShowToInput} className='text-4xl' /> : <AiOutlineClose onClick={handleShowToInput} className='text-4xl' />}
        
        <input className="w-full" onChange={e=>setReply(e.target.value)} placeholder={reply}/>
        <button onClick={e=>handleSendMessage(e)} type="submit" >Send Message</button>
    </div>
</form>
  )
}

export default SendMessageButton