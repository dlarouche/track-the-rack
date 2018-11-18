import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Dialog,
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

class ConfirmationDialog extends Component {

  render() {
    const { onClose, ...other } = this.props;

    return (
      <Dialog onClose={onClose} {...other}>
        <DialogContent>The ingredient has successfully been added!</DialogContent>
        <DialogActions>
          <Button component={ Link } to='/kitchen/ingredients'>OK</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class AddIngredientForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialog: {
        open: false
      },
      nameField: ''
    }
  }

  submit = () => {
    const { nameField } = this.state;

    const ingredient = {
      isActive: true,
      name: nameField,
    }
    database.addIngredient(ingredient)
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
 
  render() {
    return (
      <MaterialUIForm onSubmit={this.submit}>
        <div className='App-form'>
          <TextField 
            style={styles.inputFields}
            label="Ingredient Name"
            type="text"
            name="name"
            required
            onChange={this.handleNameFieldChange}
          />
        </div>

          <div className='App-button'>
            <Button size='large' variant="outlined" type="submit">Submit</Button>
          </div>
          <ConfirmationDialog open={this.state.dialog.open} onClose={this.handleDialogClose}/>
        </MaterialUIForm>
    )
  }
}

export default AddIngredientForm;