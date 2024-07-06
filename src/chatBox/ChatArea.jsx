import React from 'react'
import Message from './Message'

const ChatArea = ({ messages, bottomRef }) => {

  return (
    <section className='chat-area'>
        <ul>
        {
            messages.length ?
            <>
                {
                    messages.map( (message, index ) => <Message key={index} message={message}/> )
                }
                <div className="bottom"></div>
                <div ref={bottomRef}></div>
            </>
            :
            <>No messages yet.</>
        }
        </ul>
    </section>
  )
}

export default ChatArea