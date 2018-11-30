import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import moment from 'moment';

import database from '../firebase/index';


const styles = {
  header: {
    color: '#718da2',
    textAlign: 'center',
    margin: '20px 20px 20px 20px',
    fontSize: 'xx-large'
  },
  listItem: {
    borderBottom: 'thin solid #f2f2f2',
    paddingLeft: '16px',
    paddingBottom: '5px',
    paddingTop: '5px'
  }
}

class WaiterApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      meals: [],
    }
  }

  componentDidMount() {
    database.listenOnMeals((meals => {
      if (meals) this.setState({ meals });
    }));
  }

  render() {
    const { meals } = this.state;

    meals.sort((a,b) => new Date(b.updateTimeStamp) - new Date(a.updateTimeStamp)); // sort by time (most recent first)

    const listItems = () => meals.map((meal, key) => {
      if (!meal.isActive) {
        const timeStamp = meal.updateTimeStamp ? moment(meal.updateTimeStamp).format("YYYY-MM-DD h:mmA") : null;
        return (
          <ListItem key={key}>
            <ListItemText primary={meal.name} secondary={timeStamp ? `Updated: ${timeStamp}` : null} style={styles.listItem}/>
          </ListItem>
        )
      }
      return null;
    });

    return (
      <div>
        <Typography variant="h2" gutterBottom style={styles.header}>
          Unavailable Meals
        </Typography>
        <List>
          {listItems()}
        </List>
      </div>
    )
  }
}

export default WaiterApp;