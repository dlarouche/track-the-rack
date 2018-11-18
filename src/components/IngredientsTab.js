import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import update from 'immutability-helper';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Button,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import capitalize from 'capitalize';

import database from '../firebase/index';
import '../App.css';

class IngredientsTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: [],
    }
  }

  componentDidMount() {
    this.setIngredients();
  }

  setIngredients() {
    database.getIngredients()
      .then(ingredients => {
        if (ingredients) this.setState({ ingredients });
      })
  }

  disableMeals(ingredient) {
    database.getMeals()
      .then(meals => {
        const updatedMeals = meals.map(meal => {
          
          if (meal.ingredients.indexOf(ingredient.name) > -1) { // the meal contains this ingredient
            meal.isActive = false;
          }
          return meal;
        })

        database.updateMeals(updatedMeals);
      })
  }

  handleToggle = value => () => {
    const { ingredients } = this.state;
    const ingredientIndex = ingredients.findIndex(ingredient => {
      return ingredient.name === value;
    })
    const newIsActive = !this.state.ingredients[ingredientIndex].isActive;
    
    this.setState({
      ingredients: update(this.state.ingredients, {[ingredientIndex]: {isActive: {$set: newIsActive}}})
    }, () => {
      database.updateIngredients(this.state.ingredients);

      if (!newIsActive) { // disabled ingredient
        this.disableMeals(this.state.ingredients[ingredientIndex])
      }
    });
  }

  handleDeleteTap = value => () => {
    this.setState({
      ingredients: this.state.ingredients.filter(ingredient => ingredient.name !== value)
    }, () => {
      database.updateIngredients(this.state.ingredients);
    });
  }

  render() {
    const { ingredients } = this.state;

    const listItems = () => ingredients.map((ingredient, key) => 
      <ListItem key={key}>
        <ListItemText primary={capitalize(ingredient.name)} />
        <ListItemSecondaryAction>
          <Switch
            color='primary'
            onChange={this.handleToggle(ingredient.name)}
            checked={ingredient.isActive}
          />
          <Button
            style={{color: 'red'}}
            onClick={this.handleDeleteTap(ingredient.name)}
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
            to='/kitchen/ingredients/add'
          >
            <AddIcon/>
          </Button>
        </div>
      </div>
    )
  }
}

export default IngredientsTab;