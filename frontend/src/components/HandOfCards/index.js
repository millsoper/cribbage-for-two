import React, {Fragment} from 'react';
import { Card } from '../Card';
import './HandOfCards.css';

export const HandOfCards = ({ cards, isOwnHand }) => {

    return (
        <div className="hand-of-cards">
            {
                cards.map(({suit, rank}) => {
                    return <Card suit={suit} rank={rank} isFacingUp={isOwnHand} />
                })
            }
        </div>
    )
}