import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/ListItem';
import kiminonawa from '../audio/kiminonawa.mp3'


// referenced mini drawer from material-ui
const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    background: 'rgba(0, 0, 0, 0.25)',
    border: 'none',
    color: 'white !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Navbar(props) {
  const classes = useStyles();
  // const className = thisStyles();
  const [open, setOpen] = React.useState(false);
  let play = false;
  function handlePlay() {
    var song = document.getElementById('anime-song');
    play = !play;
    if (play) {
      song.play();
    } else {
      song.pause();
    }
  }

  function handleDrawerToggle() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} >
          <div className="toggle-navbar-button">
            <IconButton onClick={handleDrawerToggle}>
              {open === false ? <ChevronRightIcon className="toggle-arrow" /> : <ChevronLeftIcon className="toggle-arrow" />}
            </IconButton>
          </div>
        </div>
        <Divider />
        <List>
          {props.user ? (<SignedInLinks />) : (<SignedOutLinks />)}
          <MenuItem button key="home" className="list-item">
            <button className="auth-btn nav-link-item" onClick={handlePlay}>
              <div id="toggle-play">
                <i className="fas fa-play">&nbsp; <span className="list-text"><audio id="anime-song" src={kiminonawa} controls /></span></i>
              </div>
            </button>
          </MenuItem>

          <Divider />
        </List>
      </Drawer>

    </div >
  );

}

export default Navbar