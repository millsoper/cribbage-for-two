import React, { useState, useEffect } from 'react'
import Buttons from '../../Buttons'
import { HandOfCards } from '../HandOfCards'
import "./CardTable.css";

const URL = 'ws://localhost:3030'

export const CardTable = () => {
  const [ name, setName] = useState('');
  const [ ws, setWs ] = useState(new WebSocket(URL)); 
  const [ deck, setDeck ] = useState([]);
  const [ deckTopCard, setDeckTopCard ] = useState(false);
  const [ ownHand, setOwnHand ] = useState([]);
  const [ opponentHand, setOpponentHand ] = useState([]);
  const [ dealToSelf, setDealToSelf ] = useState(false);
  const [ players, setPlayers ] = useState([]);

  console.log("name: ", name);

  useEffect(() => {
    ws.onopen = () => {
      // on connecting, log it to the console and ask what players are already present.
      console.log('connected');
      ws.send(JSON.stringify({ action: 'getPlayers'}));
    }

    ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      console.log("message received on frontend: ", message);
      setDeck(message.deck);
      setPlayers(Object.keys(message.hands));
      Object.keys(message.hands).forEach((player) => {
        console.log("Hand in question: ", player);
        console.log("the player: ", name);
        if (player === name) {
          setOwnHand(message.hands[player])
        } else {
          setOpponentHand(message.hands[player])
        }
      })
    }

    ws.onclose = () => {
      console.log('disconnected, trying to reconnect.')
      // automatically try to reconnect on connection loss
      setWs({ ws: new WebSocket(URL)});
    }
  }, [ws, deck, name, players, setPlayers, setDeck, setOwnHand, setOpponentHand]);

  const dealCard = (ws, dealToSelf, name) => {
    const message = { action: 'dealCard', dealToSelf: dealToSelf, player: name }
    ws.send(JSON.stringify(message))
    setDealToSelf(!dealToSelf);
  }

  const joinGame = (ws, name) => {
    if (name){
      const message = JSON.stringify({ player: name, action: 'joinGame'});
      ws.send(message);
    } else {
      console.log("Please enter a name before starting the game.");
    }

  }

    return (
      <div className="card-table">
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <Buttons
          ws={ws}
          onDealCard={() => dealCard(ws, dealToSelf, name)}
          joinGame={() => joinGame(ws, name)}
        />
        <HandOfCards cards={opponentHand} isOwnHand={false}/>
        <HandOfCards cards={ownHand} isOwnHand={true}/>
        <p>{`Your hand has ${ownHand.length} cards`}</p>
        <p>{`Your opponent's hand has ${opponentHand.length} cards`}</p>
        <p>{`The deck has ${deck.length} cards`}</p>
        <p>{`There are currently ${players.length} players in the game.`}</p>
        <ul>
          { players.map((player) => {
              return <li>{player}</li>
            })
          }
        </ul>
      </div>
    )
  }