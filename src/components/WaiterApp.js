import React from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

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

const WaiterApp = () => (
  <div>
  <Typography variant="h2" gutterBottom style={styles.header}>
    Unavailable Meals
  </Typography>
    <List>
      <ListItemText primary='Chicken Pasta' secondary='Update: 9:54pm' style={styles.listItem}/>
      <ListItemText primary='Chicken Pasta' secondary='Update: 9:54pm' style={styles.listItem}/>
      <ListItemText primary='Chicken Pasta' secondary='Update: 9:54pm' style={styles.listItem}/>
    </List>
  </div>
)

export default WaiterApp;