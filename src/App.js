import React, { Component } from 'react';
import './App.css';
import FootballPlayerList from './containers/football-player-list';
import withErrorHandler from './components/hoc/whitErrorHandler/withErrorHandler'
import axios from './axios/axios';

class App extends Component {
  render() {
    return (
      <FootballPlayerList/>
    );
  }
}

export default withErrorHandler(App, axios);
