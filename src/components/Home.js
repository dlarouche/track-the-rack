import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';

import Button from '@material-ui/core/Button';

const Home = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Track the Rack
      </p>
      <div>
        <Button size='large' variant='outlined'>
          <Link to='/waiter'>Waiter App</Link>
        </Button>
        <Button size='large' variant='outlined'>
          <Link to='/kitchen'>Kitchen App</Link>
        </Button>
      </div>
    </header>
  </div>
)

export default Home;