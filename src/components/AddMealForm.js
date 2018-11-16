import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Input,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import MaterialUIForm from 'material-ui-form';

import database from '../firebase/index';
import '../App.css';


const styles = {
  inputFields: {
    margin: '20px 20px 20px 20px'
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class ConfirmationDialog extends Component {

  render() {
    const { onClose, ...other } = this.props;

    return (
      <Dialog onClose={onClose} {...other}>
        <DialogContent>The meal has successfully been added!</DialogContent>
        <DialogActions>
          <Button component={ Link } to='/kitchen/meals'>OK</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class AddMealForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialog: {
        open: false
      },
      nameField: '',
      selectedIngredients: [],
      selectableIngredients: []
    }
  }

  componentDidMount() {
    database.getIngredients()
    .then(ingredients => {
      const selectableIngredients = ingredients.map(ingredient => ingredient.name)
      this.setState({ selectableIngredients });
    })
  }

  submit = () => {
    const { nameField, selectedIngredients } = this.state;

    const meal = {
      ingredients: selectedIngredients,
      isActive: true,
      name: nameField,
    }
    database.addMeal(meal)
    .then(() => {
      this.handleDialogOpen();
    })
  }

  handleDialogClose = () => {
    this.setState({ dialog: { open: false }})
  }

  handleDialogOpen = () => {
    this.setState({ dialog: { open: true }})
  }

  handleNameFieldChange = event => {
    this.setState({ nameField: event.target.value })
  }

  handleDropdownChange = event => {
    this.setState({ selectedIngredients: event.target.value });
  }
 
  render() {
    const { selectedIngredients, selectableIngredients } = this.state;

    return (
      <MaterialUIForm onSubmit={this.submit}>
        <div className='App-form'>
          <TextField 
            style={styles.inputFields}
            label="Meal Name"
            type="text"
            name="name"
            required
            onChange={this.handleNameFieldChange}
          />
        </div>

        <div className='App-form'>
          <FormControl style={styles.inputFields}>
              <InputLabel htmlFor='select-multiple-chips'>Ingredients</InputLabel>
              <Select
                multiple
                value={selectedIngredients}
                onChange={this.handleDropdownChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
                >
                {selectableIngredients.map(ingredient => (
                  <MenuItem key={ingredient} value={ingredient}>
                    {ingredient}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the ingredients in this meal</FormHelperText>
            </FormControl>
          </div>

          <div className='App-button'>
            <Button size='large' variant="outlined" type="submit">Submit</Button>
          </div>
          <ConfirmationDialog open={this.state.dialog.open} onClose={this.handleDialogClose}/>
        </MaterialUIForm>
    )
  }
}

export default AddMealForm;