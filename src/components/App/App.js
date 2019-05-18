import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';

import Header from '../Header/Header.js';
import FeelyImageCarousel from '../FeelyImageCarousel/FeelyImageCarousel.js';

class App extends Component {

  componentWillMount(){
    this.props.dispatch({type: 'FETCH_IMAGES'});
    this.props.dispatch({type: 'FETCH_TAGS'});
  }

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

export default connect()(App);
