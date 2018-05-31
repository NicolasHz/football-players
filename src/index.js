import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import footballPlayers from './store/reducers/player-reducer';

const rootReducer = combineReducers({
    players: footballPlayers
});

const store = createStore(rootReducer);


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
