import React, { useState } from 'react';
import "./Card.css";
import classnames from "classnames";

const rankIcons = {
  k: "🤴",
  q: "👸",
  j: "🤵",
  a: "A"
};

const suitIcons = {
  spade: "♠️",
  clubs: "♣️",
  diamonds: "♦️",
  hearts: "♥️"
};

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

  return (
    <div
      className={classnames(
        suit === "hearts" || suit === "diamonds" ? "red" : "black"
      )}
    >
      <div className="card-head">
        <badge className="suit">{suitIcons[suit]}</badge>
        <badge className="rank">{rank.toString().toUpperCase()}</badge>
      </div>
      {isRoyalCard && <badge>{rankIcons[rank]}</badge>}
      <div className="card-foot">
        <badge className="rank">{rank.toString().toUpperCase()}</badge>
        <badge className="suit">{suitIcons[suit]}</badge>
      </div>
    </div>
  );
};