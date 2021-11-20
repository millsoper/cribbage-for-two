import React, { useState, useEffect } from 'react'
import Buttons from '../../Buttons'
import { HandOfCards } from '../HandOfCards'
import "./CardTable.css";

const URL = 'ws://localhost:3030'

export const CardTable = () => {

  const gameSteps = {
    'join': 'Enter a username to join a game.',
    'wait-for-opponent': 'There are not enough players to start the game. Please wait for an opponent to join.',
    'opponent-deal': 'Please wait for you opponent to deal the cards.',
    'deal': 'It\'s your deal! Click the deck to deal the hands. (6 for you, and 6 for your opponent.)',
    'startgame': 'THUNDERDOME.'
  }

  const [ name, setName] = useState('');
  const [ loggedIn, setIsLoggedIn ] = useState(false);
  const [ ws, setWs ] = useState(new WebSocket(URL)); 
  const [ deck, setDeck ] = useState([]);
  const [ deckTopCard, setDeckTopCard ] = useState(false);
  const [ ownHand, setOwnHand ] = useState([]);
  const [ opponentHand, setOpponentHand ] = useState([]);
  const [ dealToSelf, setDealToSelf ] = useState(false);
  const [ players, setPlayers ] = useState([]);
  const [ step, setStep] = useState('join');

  console.log("name: ", name);

  useEffect(() => {
    if (step === 'wait-for-opponent' && players.length > 1){
      const nextStep = players[1] === name ? 'opponent-deal' : 'deal';
      setStep(nextStep);
    }

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
  }, [ws, deck, name, players, step, setStep, setPlayers, setDeck, setOwnHand, setOpponentHand]);

  const dealCard = (ws, dealToSelf, name) => {
    const message = { action: 'dealCard', dealToSelf: dealToSelf, player: name }
    ws.send(JSON.stringify(message))
    setDealToSelf(!dealToSelf);
  }

  const joinGame = (ws, name) => {
    if (name){
      const message = JSON.stringify({ player: name, action: 'joinGame'});
      ws.send(message);
      setStep('wait-for-opponent');
    } else {
      console.log("Please enter a name before starting the game.");
    }

  }

    return (
      <div className="card-table">
        { loggedIn ?
        <p>{`Player name: ${name}`}</p> :
        <>
          <label htmlFor="name">
            Name:&nbsp;
            <input
              type="text"
              id={'name'}
              placeholder={'Enter your name...'}
              value={name}
              onChange={e => { setName(e.target.value)}}
            />
          </label>
          </>
}

          <Buttons
            ws={ws}
            onDealCard={() => dealCard(ws, dealToSelf, name)}
            joinGame={() => { joinGame(ws, name); setIsLoggedIn(true)}}
          />
        <div className="table-center">
          <div className="card-area">
            <HandOfCards cards={opponentHand} isOwnHand={false}/>
            <HandOfCards cards={ownHand} isOwnHand={true}/>
          </div>
          <div className="game-status">
            <p> Game status:</p>
            <p>{ gameSteps[step] } </p>
          </div>
        </div>
        <p>{`Cards remaining in deck: ${deck.length}`}</p>
        <div>
          <p>Players in game: </p>
          { players.map((player) => {
              return <p>{player}</p>
            })
          }
        </div>
      </div>
    )
  }