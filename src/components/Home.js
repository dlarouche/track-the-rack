import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';

import Button from '@material-ui/core/Button';

const styles = {
  buttons: {
    margin: '3px 3px 3px 3px',
    color: '#718da2'
  }
}

const Home = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Track the Rack
      </p>
      <div>
        <Button size='large' variant='outlined' style={styles.buttons} component={ Link } to='/waiter'>
          WAITER APP
        </Button>
        <Button size='large' variant='outlined' style={styles.buttons} component={ Link } to='/kitchen'>
          KITCHEN APP
        </Button>
      </div>
    </header>
  </div>
)

export default Home;