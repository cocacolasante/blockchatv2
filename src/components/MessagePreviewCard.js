import React from 'react'

const MessagePreviewCard = ({from, text, messageId, }) => {
  return (
    <>
        <h2>{from}</h2>
        <p>{text.slice(0,50)}</p>
    </>
  )
}

export default MessagePreviewCard