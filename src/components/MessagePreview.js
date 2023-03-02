import React from 'react'

const MessagePreview = ({messages}) => {


  return (
    <>
        {messages && messages.map((message, i) =>{
            return(
              <div key={i}>
                <h2>From:</h2>
                <p>Message text preview</p>
              </div>
            )
        })}
    </>
  )
}

export default MessagePreview