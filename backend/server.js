const WebSocket = require('ws');
const deckUtils = require('./deck');

const wss = new WebSocket.Server({port: 3030});

const deck = deckUtils.getNewDeck();
const hands = {};

const ACTIONS = { 
  DEAL_CARD: 'dealCard',
  JOIN_GAME: 'joinGame',
  GET_PLAYERS: 'getPlayers'
};

wss.broadcast = function(data) {
  wss.clients.forEach(client => client.send(data));
};

wss.on('connection', function connection(ws, req) {
  console.log('received connection.');

  let savedPlayer = '';

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);
    console.log("message action: ", parsedData.action);

    if (parsedData.action === ACTIONS.JOIN_GAME) {
      const name = parsedData.player;
      savedPlayer = name;
      console.log(`${name} is joining the game!`);
      hands[name] = [];
      let stringData = JSON.stringify({ deck, hands });
      console.log("parsedData: ", stringData);
      // we send this to everyone, because they want to know
      wss.broadcast(stringData);

    } else if (parsedData.action === ACTIONS.DEAL_CARD) {
      const currentPlayer = parsedData.player;
      console.log(`${currentPlayer} is dealing a card.`);
      if ( parsedData.dealToSelf){
        const cardToDeal = deck.pop();
        hands[currentPlayer].push(cardToDeal);
        console.log("dealing to self: ", hands[currentPlayer]);
      } else {
        const cardToDeal = deck.pop();
        // this goofy var just lets us log out.
        let otherPlayer = '';
        // this assumes we only have two players, which is not enforced right now.
        Object.keys(hands).forEach(function (playerName){
          if (playerName !== currentPlayer){
            otherPlayer = playerName;
            console.log("playerName: ", playerName);
            hands[playerName] && hands[playerName].push(cardToDeal);
          }
        });
        console.log('deal to opponent! ', hands[otherPlayer]);
      }
      wss.broadcast(JSON.stringify({ deck, hands }));
    } else if (parsedData.action === ACTIONS.GET_PLAYERS) {
      wss.broadcast(JSON.stringify({ deck, hands }));
    }
  });
  ws.on('close', function close(){
    hands[savedPlayer] = undefined;
    console.log(`socket closed, hand for ${savedPlayer} destroyed.`);
  });
});
