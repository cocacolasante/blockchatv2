import MessagePreviewContainer from "./MessagePreviewContainer"
import { getListOfMessage } from "@/app/utils/firestore"

const fetchUserMessages =  () =>{
  return getListOfMessage("0x4b2abf635f824e3419e524200f34148d30ee5876")
}

const Sidebar = () => {
  
  
  return (
    <div className='flex flex-col flex-1 h-screen'>
        <h2 className=''>Sidebar</h2>
        <MessagePreviewContainer  />
    </div>
  )
}

export default Sidebar