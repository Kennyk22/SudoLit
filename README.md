# SudoLit

An app that lets you create simple visual flowcharts for creative projects. Create, Save and edit Flowcharts with text and images.
    
![SudoLit](https://user-images.githubusercontent.com/114926465/218268179-6799f273-f1b1-4d09-99e9-271b4a1dd41f.jpg)

## Getting Started
clone the repo
```
git clone https://github.com/Kennyk22/SudoLit.git
cd SudoLit
```

install dependencies in both the client and server folder
```
cd client
npm i
cd ..
cd server
npm i
```

add a .env file to the server for your personal mongodb database and a link to your cloudinary API
```
PORT = XXXX
CLOUD_NAME = XXXX
API_KEY = XXXX
API_SECRET = XXXX
SOURCEPORT = XXX
```

Run  both the client and the server
```
cd client
npm start
cd ..
cd server
npm run dev
```

## Tech Stack
### Client
* [Auth0](https://auth0.com/)
* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [React-Redux](https://react-redux.js.org/)
* [Reactflow](https://reactflow.dev/)
### Server
* [JavaScript](https://www.javascript.com/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Cloudinary](https://cloudinary.com/)


## Contributors
* Kenneth Karter - [Github](https://github.com/Kennyk22) - [LinkedIn](https://www.linkedin.com/in/kenneth-karter-253a89265/)
