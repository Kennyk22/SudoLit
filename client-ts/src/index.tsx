import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { compose, createStore } from 'redux'
import nodeReducer from './reducers';
import { Auth0Provider } from '@auth0/auth0-react';

//looks weird but just makes the store with the web tools, needed for typescript

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const store = createStore(nodeReducer, composeEnhancers())

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider 
      domain='dev-54vtbvcdkpef3tai.us.auth0.com' 
      clientId='RIAOSjTQVCkozDWOVU5Z35fyxqXNDyZl'
      redirectUri={window.location.origin}
      audience='http://localhost:3001'
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
