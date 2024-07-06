import React from 'react';
import { useState } from 'react';

const SendArea = ({ chatIsActive, addMessage }) => {

  const [text, setText] = useState();
  
  function sendMessage() {
    if (text === '') {
      return;
    }
    addMessage('user', text);
    setText('');
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  }

  return (
    <section className='send-area'>
      <div className="send-wrapper">
        <textarea disabled={!chatIsActive} onKeyDown={handleKeyDown} value={text} onChange={(e) => setText(e.target.value)} name="" id="" placeholder="Enter your text here"/>
        <button disabled={!chatIsActive} onClick={sendMessage}>Send</button>
      </div>
    </section>
  )
}

export default SendArea