"use client"
import { useState } from "react"

const CurrentThread = () => {
    const [reply, setReply] = useState("Send Message")

    const handleSendMessage = (e) =>{
        e.preventDefault()
        console.log("sending message")
        setReply("Send Message")
    }
    
  return (
    <div className='flex justify-center w-full bg-gray pb-36'>
        <h1 className=''>Current Thread</h1>
        
        <form className="absolute bottom-0 m-auto" onSubmit={e=>handleSendMessage(e)}>
            <div className="flex">
                
                <input className="w-full" onChange={e=>setReply(e.target.value)} placeholder={reply}/>
                <button onClick={e=>handleSendMessage(e)} type="submit" >Send Message</button>
            </div>
        </form>
            
    
    </div>
  )
}

export default CurrentThread