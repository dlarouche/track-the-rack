import React, { Component }from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Switch, Route, Link } from 'react-router-dom';

import IngredientsTab from './IngredientsTab';
import MealsTab from './MealsTab';
import AddMealForm from './AddMealForm';
import AddIngredientForm from './AddIngredientForm';


class KitchenApp extends Component {

  state = {
    value: 0
  }

  componentDidMount() {
    const { location } = this.props;

    if (location.pathname.includes('/kitchen/meals')) {
      this.setState({ value: 1 })
    }
    
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
        >
          <Tab label="Ingredients" component={ Link } to='/kitchen/ingredients'/>
          <Tab label="Meals" component={ Link } to='/kitchen/meals'/>
        </Tabs>
      </AppBar>
        <Switch>
          <Route exact path='/kitchen' component={IngredientsTab}/>
          <Route exact path='/kitchen/ingredients' component={IngredientsTab}/>
          <Route exact path='/kitchen/ingredients/add' component={AddIngredientForm}/>
          <Route exact path='/kitchen/meals' component={MealsTab}/>
          <Route exact path='/kitchen/meals/add' component={AddMealForm}/>
        </Switch>
    </div>
    )
  }
}

export default KitchenApp;