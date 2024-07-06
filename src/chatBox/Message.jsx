import React from 'react';

const Message = ({message}) => {
  return (
        <div className={`message-item ${message.type}`}>
            {message.text}
        </div>
  )
}

export default Message