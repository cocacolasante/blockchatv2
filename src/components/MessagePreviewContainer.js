import { getListOfMessage } from "@/app/utils/firestore"


const MessagePreviewContainer = () => {
 const messages = getListOfMessage("0x4b2abf635f824e3419e524200f34148d30ee5876")
  
  return (
    <>
      {console.log(messages)}
      <p>Preview</p>
    </>
  )
}

export default MessagePreviewContainer