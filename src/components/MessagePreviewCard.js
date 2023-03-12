import Link from "next/link"
import SendReply from "./profileComponents/SendReply"

const MessagePreviewCard = ({from, text, timestamp, urlLink, activeAccount }) => {
  const epochtime = timestamp * 1000
  const date = new Date(epochtime )
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString(); 
 
  
  return (
    <div className="m-auto border border-gray-500 rounded-md  w-[90%]" >
      <div className=''>
          <Link href={`/chat/message/${urlLink}`} className='text-sm hover:shadow-md hover:underline'>{from}</Link>
          {<p className='text-sm '>{text.slice(0,50)}</p>}
          <p className="text-sm">{dateFormat}</p>
          <SendReply activeAccount={activeAccount} receiver={from} buttonText="Reply" />
      </div>
      
    </div>
  )
}

export default MessagePreviewCard