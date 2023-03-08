
import MessagePreviewContainer from "./MessagePreviewContainer"
import SentMessagePreview from "./sentcomponents/SentMessagePreview"
import Link from "next/link"
import { useAccountContext } from "@/context/accountContext"
import MessagePrevClient from "./MessagePrevClient"
import MessClientContainer from "./MessClientContainer"





const Sidebar = () => {

  
  
  
  return (
    <div className='flex flex-col flex-1 h-screen border border-gray-600 rounded-md'>
        <div className="flex justify-center space-x-3">
          <Link href={`/chat`} onClick={null}>Inbox</Link>
          
        </div>
       <MessClientContainer  />
        
    </div>
  )
}

export default Sidebar