import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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

  render() {
    const { meals } = this.state;

    const listItems = () => meals.map((meal, key) => 
      <ListItem key={key}>{meal.name}</ListItem>
    )
    
    return (
      <List>
        {listItems(meals)}
      </List>
    )
  }
  
}

export default MealsTab;