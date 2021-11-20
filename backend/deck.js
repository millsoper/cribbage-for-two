const rankIcons = ['K', 'Q', 'J', 'A'];
  
  const suitIcons = [
    'spades',
    'clubs',
    'diamonds',
    'hearts'
  ];
  
const generateDeck = function (){
    let deck = [];
    suitIcons.forEach(function(suit) {
      rankIcons.forEach(function(rank) {
        deck.push({ suit: suit, rank: rank });
      });
      for (let i = 2; i <= 10; i++) {
        deck.push({ suit: suit, rank: i });
      }
    });
    // add on the two jokers if you want.
    //deck.concat([{ }]);
    console.log("length of deck: ", deck.length);
  
    return deck;
  };
  
  // This is the Fisher/Yates array shuffle, direct from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleDeck = function(deck) {
    let currentIndex = deck.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex], deck[currentIndex]];
    }
  
    return deck;
}
  
const getNewDeck = function () {
    const deck = shuffleDeck(generateDeck());
    return deck;
}

module.exports = { getNewDeck, shuffleDeck };
    