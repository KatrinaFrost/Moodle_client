import React, { Component } from 'react';
import './App.css';
import './HeatMap.css';
import { MoodApp } from './MoodApp'


class App extends Component {
  render() {
    return (
      <div className="App">
      <MoodApp />
      </div>
    );
  }
}

export default App;
