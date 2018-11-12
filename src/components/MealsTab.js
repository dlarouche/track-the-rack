import React, { Component } from 'react';
import update from 'immutability-helper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

import database from '../firebase/index';
import { ListItemText } from '@material-ui/core';

class MealsTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meals: [],
    }
  }

  componentDidMount() {
    this.setMeals();
  }

  setMeals() {
    database.getMeals()
    .then((meals) => {
      if (meals) this.setState({ meals });
    })
  }

  handleToggle = value => () => {
    const { meals } = this.state;
    const mealIndex = meals.findIndex(meal => {
      return meal.name === value;
    })
    const isActive = !this.state.meals[mealIndex].isActive;
    
    this.setState({
      meals: update(this.state.meals, {[mealIndex]: {isActive: {$set: isActive}}})
    }, () => {
      database.updateMeals(this.state.meals);
    });
  }

  render() {
    const { meals } = this.state;

    const listItems = () => meals.map((meal, key) => 
      <ListItem key={key}>
        <ListItemText primary={meal.name} />
        <ListItemSecondaryAction>
          <Switch
            color='primary'
            onChange={this.handleToggle(meal.name)}
            checked={meal.isActive}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
    
    return (
      <List>
        {listItems()}
      </List>
    )
  }
  
}

export default MealsTab;