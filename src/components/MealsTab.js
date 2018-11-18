import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Button
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

import database from '../firebase/index';
import '../App.css';

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
    const timeStamp = Date.now();
    
    this.setState({
      meals: update(this.state.meals, {
        [mealIndex]: {
          isActive: {$set: newIsActive},
          updateTimeStamp: {$set: timeStamp}
        }
      })
    }, () => {
      database.updateMeals(this.state.meals);
    });
  }

  handleDeleteTap = value => () => {
    this.setState({
      meals: this.state.meals.filter(meal => meal.name !== value)
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
          <Button
            style={{color: 'red'}}
            onClick={this.handleDeleteTap(meal.name)}
          >
            <ClearIcon/>
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    )
    
    return (
      <div>
        <div>
          <List>
            {listItems()}
          </List>
        </div>
        <div className='App-button'>
          <Button
            variant='fab'
            color='primary'
            component={ Link }
            to='/kitchen/meals/add'
          >
            <AddIcon/>
          </Button>
        </div>
      </div>
    )
  }
  
}

export default MealsTab;