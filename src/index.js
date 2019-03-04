import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(React.createElement(Root, null, null), root);
  serviceWorker.register();
}
