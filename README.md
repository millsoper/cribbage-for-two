# cribbage-for-two

![Screen Shot 2021-11-20 at 12 45 56 PM](https://user-images.githubusercontent.com/11150372/142740471-fa1ac378-5d45-43f8-9268-27585cc58ce9.png)


### Getting Started

You will need to have node and npm installed on your computer for this.

You can find instructions for downloading them [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). 

1. Clone down this project onto your local machine.

2. Navigate to `/backend` (one level down from root.)

3. Run `npm install` to install all dependencies, and then `node server.js`

4. Navigate back up to root, and then down to `/frontend` (it should be next to `backend`.)

5. Again, run `npm install`. Then run `npm run start`.

6. This should open a page in your browser at `localhost:3000` and you can start playing.

### Notes on design

The frontend is a create-react-app. The backend is a basic node server, using the [ws](https://www.npmjs.com/package/ws) library.

### Next steps:
- [X] Build deck creation
- [X] Build visible cards
- [X] Choose shuffling algo for deck
- [X] Switch in SVGs instead of emojis for card suits
- [X] set up the WebSocket
- [X] get card to each player as they join a game
- [X] keep track of all players in a game
- [X] allow players to move cards (by dealing) and emit changes to all players
- [X] store player names to keep track of whose cards are whose
- [X] build basic skeleton for tracking progress of the game (which step are you at)
- 
(Rooms)
- [ ] Create a room for each game, with a unique string identifier
- [ ] Allow users to log into a "room" using the correct string identifier
- [ ] Add in this step in the game steps
- [ ] Limit room size to 2, with appropriate messaging to explain this to the user
- [ ] Show list of rooms that opt-in to be joined by random people

(Card interfaces)
- [ ] Keep track of which cards are highlighted (when flipped face-up) so you can see your opponent highlight cards for sets?
- [ ] Make image for the deck and add it
- [ ] Move "deal" logic onto the deck
- [ ] Disable deal except for when appropriate
- [ ] Create the display (or displays) for "played" cards
- [ ] Create the display for the card on top of the deck
- [ ] Create the crib
- [ ] Add a graphic for the backs of the cards

(Cribbage board)
- [ ] Create an appropriate image for the cribbage board itself (preferring the snake layout?)
- [ ] Create an image for the pegs of the cribbage board
- [ ] Write logic for displaying the score on the cribbage board

(Scoring)
- [ ] Make a list of the different types of scoring combos. It might be type and number for each.
- [ ] Make an interface for the user to declare a scoring combo, both for pegging and for final count-up
- [ ] Decide on how to display each scoring combo as they're enacted

(End game logic)
- [ ] wrap it up as appropriate!
- [ ] clean up the room.

(Chat feature...?)
- [ ] add in a very basic chat feature.
- [ ] This should be surprisingly lightweight, and would help with scoring. It could have presets for scoring?
