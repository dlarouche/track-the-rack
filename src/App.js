import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home';
import WaiterApp from './components/WaiterApp';
import KitchenApp from './components/KitchenApp';

const App = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/waiter' component={WaiterApp}/>
    <Route path='/kitchen' component={KitchenApp}/>
  </Switch>
)

export default App;
