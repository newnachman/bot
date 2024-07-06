import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Flow } from '../chatFlow/chatFlow'
import { useGenerateBotResponses } from '../chatFlow/useFlow'
import ChatArea from './ChatArea'
import HeaderArea from './HeaderArea'
import SendArea from './SendArea'

const ChatBox = () => {

  const [messages, setMessages] = useState([]);
  const [chatIsActive, setChatIsActive] = useState(true);
  const {botResponse, parseInput} = useGenerateBotResponses();
  const bottomRef = useRef();
  const mounted = useRef(false);

  const addBotMessage = useCallback(
    (textArray = [], type = 'bot') => {
        if (textArray.length) {
          setMessages( prev => prev.filter( item => item.type !== 'loading' ) );
    
          textArray.forEach( text => {
            setMessages(prev =>  [...prev, {type, text}])
          })
    
          scrollDown(800);
        }
    }, [],
  )

  useEffect(() => {
    if (mounted.current) {
      return;
    }
    mounted.current = true;
    setTimeout(() => {
      addBotMessage(Flow.start)
    }, 800);
  }, [addBotMessage])

  useEffect(() => {
    if (!botResponse) {
      return;
    }
    addBotMessage(botResponse.textArray, botResponse.type);

    if (botResponse.type === 'end') {
      setChatIsActive(false);
    }
  }, [botResponse, addBotMessage])
  
  function addMessage( type, text ) {
    if (text.startsWith('_')) {
      return;
    }
    setMessages( prev => [ ...prev, { type, text }] );

    if (type === 'user') {
      parseInput(text.toLowerCase());
    }

    scrollDown(500);
  }

  function scrollDown(time) {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, time);
  }

  return (
    <div className='chat-box'>
        <HeaderArea />
        <ChatArea messages={messages} bottomRef={bottomRef}/>
        <SendArea chatIsActive={chatIsActive} addMessage={addMessage} />
    </div>
  )
}

export default ChatBox