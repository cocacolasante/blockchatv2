// "use client"
import MessagePreviewContainer from "./MessagePreviewContainer"
import SentMessagePreview from "./SentMessagePreview"
import Link from "next/link"
import { useAccountContext } from "@/context/accountContext"
import MessagePrevClient from "./MessagePrevClient"




const Sidebar = () => {

  

  
  return (
    <div className='flex flex-col flex-1 h-screen border border-gray-600 rounded-md'>
        <div className="flex justify-center space-x-3">
          <button className="bg-gray-400 border border-gray-500 rounded-md " onClick={null}>Inbox</button>
          <Link href={`/chat/sent`}>
          Sent
          </Link>
        </div>
       <MessagePreviewContainer  />
        
    </div>
  )
}

export default Sidebar