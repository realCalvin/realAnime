import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function Navbar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
        <List>
            <SignedInLinks />
            <SignedOutLinks />
        </List>
      
    </div>
  );
  
  return (
    <div className="my-side-navbar">
        <div className="outer">
            <div className="logo-navbar">
                <List className="toggle-arrow">
                    <ListItem>
                        <Button onClick={toggleDrawer('left', true)} className="navbar-toggle-button"><i className="fas fa-angle-double-right"></i></Button>
                    </ListItem>
                </List>
            </div>
        </div>
        <nav className="navbar">
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </nav>
    </div>
  );
}

export default Navbar