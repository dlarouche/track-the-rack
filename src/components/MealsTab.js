import React, { Component } from 'react';
import update from 'immutability-helper';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch
} from '@material-ui/core/';

import database from '../firebase/index';

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
    const newIsActive = !this.state.meals[mealIndex].isActive;
    
    this.setState({
      meals: update(this.state.meals, {[mealIndex]: {isActive: {$set: newIsActive}}})
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