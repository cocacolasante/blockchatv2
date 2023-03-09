import Link from "next/link"

const MessagePreviewCard = ({from, text, timestamp, urlLink }) => {
  const epochtime = timestamp * 1000
  const date = new Date(epochtime )
  const dateFormat = date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString(); 
 
  
  return (
    <Link className="m-auto border border-gray-500 rounded-md hover:shadow-md hover:underline w-[90%]" href={`/chat/message/${urlLink}`}>
      <div className=''>
          <p className='text-sm'>{from}</p>
          {<p className='text-sm '>{text.slice(0,50)}</p>}
          <p className="text-sm">{dateFormat}</p>
          
      </div>
      
    </Link>
  )
}

export default MessagePreviewCard