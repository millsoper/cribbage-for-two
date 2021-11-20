import React from 'react';

export const Deck = ({ dealCard, canDeal }) => {
  const timeToDeal = false;
  const onDeal = canDeal? dealCard : () => { console.log("You can't deal a card right now.")}
  return (
    <div onClick={onDeal}>
      <span>deck</span>
      <img src="https://cdn.glitch.me/7e25fe5d-69c8-49af-842d-c26ec3885396%2Fdeck.svg?v=1637197169643" />
      { timeToDeal && <button>Shuffle deck</button> }
    </div>
  );
};