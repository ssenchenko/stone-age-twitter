import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(React.createElement(App, null, null), root);
  serviceWorker.register();
}
