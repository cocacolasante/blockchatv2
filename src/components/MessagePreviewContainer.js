import MessagePreviewCard from "./MessagePreviewCard"



const MessagePreviewContainer = async ({activeAccount}) => {

  const messages = await fetch(`https://blockchat-10f19-default-rtdb.firebaseio.com/users/0x4b2abf635f824e3419e524200f34148d30ee5876/messages/received.json`)

  const data = await messages.json()

  let jsonArr = Object.values(data)

  const messKeys = Object.keys(data)

  const messObj = {}

  for(let i = 0; i < messKeys.length; i++){
    
    jsonArr[i].key = messKeys[i]
    
  }
  // for(let i = 0; i < jsonArr.length; i++){
  //   jsonArr = jsonArr[i].assign({ key: messKeys[i] }, jsonArr);
    
  // }

  

  // getListOfMessage("0x4b2abf635f824e3419e524200f34148d30ee5876")

 
  

  return (
    <div className="flex flex-col pl-4 space-y-3">
      {jsonArr.map((message)=>{
        return(
          <MessagePreviewCard key={message.key} urlLink={message.key} from={message.from} text={message.body} timestamp={message.createdAt} />
        )
      })}
     
    </div>
  )
}

export default MessagePreviewContainer