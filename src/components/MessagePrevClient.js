"use client"
import MessagePreviewCard from "./MessagePreviewCard"
import { useState, useEffect } from "react"



const MessagePrevClient = ({activeAccount}) => {
    const [messagesList, setMessagesList] = useState()

    const fetchMessaged = async () =>{
        
        const messages = await fetch(`https://blockchat-10f19-default-rtdb.firebaseio.com/users/${activeAccount}/messages/received.json`)
        const data = await messages.json()
        
        console.log(messages)
        
        let jsonArr = Object.values(data)
      
        const messKeys = Object.keys(data)
      
        
        
        const parsedData = () =>{
            for(let i = 0; i < messKeys.length; i++){
              
              jsonArr[i].key = messKeys[i]
              
            }
            
        }

        setMessagesList(parsedData)
    }

    

 useEffect(()=>{
    fetchMessaged()
 },[])
  

  return (
    <div className="flex flex-col pl-4 space-y-3">
      {messagesList && messagesList.map((message)=>{
        return(
          <MessagePreviewCard key={message.key} urlLink={message.key} from={message.from} text={message.body} timestamp={message.createdAt} />
        )
      })}
     
    </div>
  )
}

export default MessagePrevClient