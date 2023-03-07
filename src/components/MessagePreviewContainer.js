import MessagePreviewCard from "./MessagePreviewCard"



const MessagePreviewContainer = async ({account}) => {

  

  const messages = await fetch(`https://blockchat-10f19-default-rtdb.firebaseio.com/users/0x4B2AbF635f824e3419E524200f34148D30Ee5876/messages/received.json`)
  
  const data = await messages.json()
  if(!data){
    return(
      <p>No Messages</p>
    )
  }
  console.log(data)

  let jsonArr = Object.values(data)

  const messKeys = Object.keys(data)


  for(let i = 0; i < messKeys.length; i++){
    
    jsonArr[i].key = messKeys[i]
    
  }

  

 
  

  return (
    <div className="flex flex-col pl-4 space-y-3">
      {jsonArr && jsonArr.map((message)=>{
        return(
          <MessagePreviewCard key={message.key} urlLink={message.key} from={message.from} text={message.body} timestamp={message.createdAt} />
        )
      })}
     
    </div>
  )
}

export default MessagePreviewContainer