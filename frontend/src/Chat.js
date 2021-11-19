import React, { useState, useEffect } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'ws://localhost:3030'

const Chat = () => {
  const [ name, setName] = useState('Bob');
  const [ messages, setMessages ] = useState([]);
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
      // on connecting, do nothing but log it to the console
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
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      setWs({ ws: new WebSocket(URL)});
    }
  }, [ws, deck, name, players, setPlayers, setDeck, setOwnHand, setOpponentHand]);

  const addMessage = (message) =>
    setMessages([message, ...messages])


  const submitMessage = (name, messageString, ws) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: name, message: messageString }
    ws.send(JSON.stringify(message))
    // addMessage(message)
  }

  const dealCard = (ws, dealToSelf, name) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
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
      <div>
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
        <ChatInput
          ws={ws}
          onSubmitMessage={messageString => submitMessage(name, messageString, ws)}
          onDealCard={() => dealCard(ws, dealToSelf, name)}
          joinGame={() => joinGame(ws, name)}
        />
        <span>{`Your hand has ${ownHand.length} cards`}</span>
        <span>{`Your opponent's hand has ${opponentHand.length} cards`}</span>
        <span>{`The deck has ${deck.length} cards`}</span>
        <p>{`There are currently ${players.length} players in the game.`}</p>
        <ul>
          { players.map((player) => {
              return <li>{player}</li>
            })
          }
        </ul>

        {messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />,
        )}
      </div>
    )
  }

export default Chat;