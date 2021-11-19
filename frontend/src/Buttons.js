import React from 'react';

const Buttons = ({ onDealCard, joinGame } ) => {

  return (
    <div>
      <button onClick={onDealCard}>DEAL THAT CARD</button>
      <button onClick={joinGame}>Join Game!</button>
    </div>
   )
  }

export default Buttons
