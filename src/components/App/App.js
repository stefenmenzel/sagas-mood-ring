import React, { Component } from 'react';
import './App.css';

import Header from '../Header/Header.js';
import FeelyImageCarousel from '../FeelyImageCarousel/FeelyImageCarousel.js';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Header />
        <FeelyImageCarousel />
      </div>
    );
  }
}

export default App;
