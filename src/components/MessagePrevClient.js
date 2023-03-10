"use client"
import MessagePreviewCard from "./MessagePreviewCard"
import { useState, useEffect } from "react"




const MessagePrevClient = ({activeAccount}) => {
  
  const [inboxMessages, setInboxMessages] = useState()


    const fetchMessaged = async () =>{
        
        const messages = await fetch(`https://blockchat-10f19-default-rtdb.firebaseio.com/users/${activeAccount}/messages/received.json`, { next: { revalidate: 10 } })
        
        const data = await messages.json()
        
        if(!data){
          return(
            <p>No Messages</p>
          )
        }
        
        
        let jsonArr = Object.values(data)

      
        const messKeys = Object.keys(data)


        for(let i = 0; i < messKeys.length; i++){
          
          jsonArr[i].key = messKeys[i]
          
        }
            


        setInboxMessages(jsonArr)

       
    }

    useEffect(()=>{
      fetchMessaged()
    }, [])

    

  return (
    <div className="flex flex-col pl-4 space-y-3">
      {inboxMessages && inboxMessages.map((message)=>{
        
        return(
          <MessagePreviewCard key={message.key} urlLink={message.key} from={message.from} text={message.body} timestamp={message.createdAt} />
        )
      })}
     
    </div>
  )
}

export default MessagePrevClient