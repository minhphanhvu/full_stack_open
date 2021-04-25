import React from 'react'

const Message = ({message, messageType}) => {
  return (
    <>
      <div className={messageType}>
        {message}
      </div>
    </>
  )
}

export default Message