import App from 'components/App';
import 'index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'serviceWorker';
import api from 'api'

declare global {
  interface Window {
    list : any;
    csv : any;
    create : any;
  }
}

api.csvList().then(list => window.list = list)
api.csvFind(1).then(csv => window.csv = csv)
window.create = api.csvCreate

ReactDOM.render(
  <React.StrictMode><App /></React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
