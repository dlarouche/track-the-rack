import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';

import Button from '@material-ui/core/Button';

const styles = {
  links: {
    color: '#718da2'
  },
  buttons: {
    margin: '3px 3px 3px 3px'
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
        <Button size='large' variant='outlined' style={styles.buttons}>
          <Link to='/waiter' style={styles.links}>Waiter App</Link>
        </Button>
        <Button size='large' variant='outlined' style={styles.buttons}>
          <Link to='/kitchen' style={styles.links}>Kitchen App</Link>
        </Button>
      </div>
    </header>
  </div>
)

export default Home;