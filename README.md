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
