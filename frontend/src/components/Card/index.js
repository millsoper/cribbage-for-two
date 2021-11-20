import React, { useState } from 'react';
import "./Card.css";
import classnames from "classnames";
import clubs from "../../clubs.svg";
import diamonds from "../../diamonds.svg";
import hearts from "../../hearts.svg";
import spades from "../../spades.svg";

const rankIcons = {
  k: "🤴",
  q: "👸",
  j: "🤵",
  a: "A"
};

const suits = {
  hearts,
  diamonds,
  spades,
  clubs
}

/* Each individual card */
export const Card = ({ suit, rank, isFacingUp }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (

      <div
        onClick={function() {
          setIsFocused(!isFocused);
        }}
        className={classnames(
          "card",
          { facedown: !isFacingUp },
          { focused: isFocused }
        )}
      >
        {isFacingUp && <CardContent suit={suit} rank={rank} />}
      </div>
  );
};

// Originally I was going to try to position all the pips, but doesn't seem worth it at present.
const CardContent = ({ suit, rank }) => {
  const isRoyalCard = rank in rankIcons;
  console.log("suit: ", suit);
  console.log("suit icon: ", suits[suit]);

  return (
    <div
      className={classnames(
        suit === "hearts" || suit === "diamonds" ? "red" : "black"
      )}
    >
      <div className="card-head">
        <img className="suit" src={suits[suit]}/>
        <badge className="rank">{rank.toString().toUpperCase()}</badge>
      </div>
      {isRoyalCard && <badge>{rankIcons[rank]}</badge>}
      <div className="card-foot">
        <badge className="rank">{rank.toString().toUpperCase()}</badge>
        <img className="suit" src={suits[suit]}/>
      </div>
    </div>
  );
};