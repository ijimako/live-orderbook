import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

var webSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
console.log(`webSocket.readyState`, webSocket.readyState)
webSocket.onopen = () => {
  console.log(`webSocket.readyState`, webSocket.readyState);
  console.log(`WebSocket connection is now Open`);
}
webSocket.onmessage = (message) => {
  console.log('Message', message);
};
// Implement the other event listeners here or in a seperate component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
