import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Track the Rack
          </p>
          <div>
            <Button size='large' variant='outlined'>
              Waiter App
            </Button>
            <Button size='large' variant='outlined'>
              Kitchen App
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
