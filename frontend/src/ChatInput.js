import React, { useState } from 'react';

const ChatInput = ({ onSubmitMessage, onDealCard, joinGame } ) => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <button onClick={onDealCard}>DEAL THAT CARD</button>
      <button onClick={joinGame}>Join Game!</button>
    <form
      action="."
      onSubmit={ e => {
        e.preventDefault()
        onSubmitMessage(message);
        setMessage('');
      }}
    >
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={ e => setMessage(e.target.value)}
       />
      <input type="submit" value="Send" />
    </form>
    </div>
   )
  }

export default ChatInput
