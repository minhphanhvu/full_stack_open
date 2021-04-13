import React from 'react';

const Message = ({ message, messageType }) => {
  if (!message) {
    return null;
  } else {
    return (
      <div className={messageType}>
        {message}
      </div>
    )
  }
}

export default Message;