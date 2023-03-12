"use client"
import { useEffect, useState } from "react";
import SendReply from "./SendReply";

const ContactCard = ({account, address}) => {
    const [isOpen, setIsOpen ] = useState(false)

    const handleOpenReply = (e) =>{
        e.preventDefault()

        setIsOpen(!isOpen)
    }

  return (

    <div className="flex space-x-6 border border-gray-500 rounded-md w-[65%]">
        <p>{address.toString()}</p>
        <button className="border border-gray-400 rounded-md hover:shadow " onClick={handleOpenReply} >Send New Message</button>
    {isOpen && (
        <SendReply activeAccount={account} receiver={address} />
    )}
    </div>


  )
}

export default ContactCard