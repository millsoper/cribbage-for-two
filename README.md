# cribbage-for-two

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