import React, { Component }from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route } from 'react-router-dom';

import IngredientsTab from './IngredientsTab';
import MealsTab from './MealsTab';

const styles = {
  tabs: {

  }
}


class KitchenApp extends Component {

  state = {
    ingredients: [],
    meals: [],
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    return (
    <div>
      <AppBar position="static">
        <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            style={styles.tabs}
        >
          <Tab label="Ingredients" />
          <Tab label="Meals" />
        </Tabs>
      </AppBar>
        <Switch>
          <Route exact path='/kitchen' component={IngredientsTab}/>
          <Route exact path='/kitchen/ingredients' component={IngredientsTab}/>
          <Route exact path='/kitchen/meals' component={MealsTab}/>
        </Switch>
    </div>
    )
  }
}

export default KitchenApp;