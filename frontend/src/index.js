import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import store from './store.js'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
       <Provider store={store}>
       
       <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
