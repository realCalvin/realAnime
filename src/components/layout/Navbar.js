import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';
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
import audio1 from '../audio/background1.mp3';
import audio2 from '../audio/background2.mp3';
import audio3 from '../audio/background3.mp3';
import audio4 from '../audio/background4.mp3';
import audio5 from '../audio/background5.mp3';
import background1 from '../img/background1.mp4';
import background2 from '../img/background2.mp4';
import background3 from '../img/background3.mp4';
import background4 from '../img/background4.mp4';
import background5 from '../img/background5.mp4';

var counter = 0;
const num_of_bg = 5;
var audio = [audio1, audio2, audio3, audio4, audio5]
var bg = [background1, background2, background3, background4, background5]

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
      song.muted = false;
      song.play();
      $("#play-icon").css("display", "none");
      $("#stop-icon").css("display", "inline-block");
    } else {
      song.pause();
      song.muted = true;
      $("#play-icon").css("display", "inline-block");
      $("#stop-icon").css("display", "none");
    }
  }
  function handleSkip() {
    counter++;
    if (counter === num_of_bg) {
      counter = 0;
    }
    var song = document.getElementById('anime-song');
    var video = document.getElementById('dashboard-background');
    video.pause();
    $("#anime-background").attr("src", bg[counter]);
    video.load();
    video.play();
    $("#anime-song").attr("src", audio[counter])
    song.pause();
    song.load();
    song.play();
    song.muted = true;
    play = false;
    $("#play-icon").css("display", "inline-block");
    $("#stop-icon").css("display", "none");
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
          <MenuItem button key="play" className="list-item">
            <button className="auth-btn nav-link-item" onClick={handlePlay}>
              <div id="toggle-play">
                <i id="play-icon" className="fas fa-play"> </i>
                <i id="stop-icon" className="fas fa-stop"> </i>
                <span className="list-text"><audio id="anime-song" src={audio1} controls autoPlay muted playsInline /></span>
              </div>
            </button>
          </MenuItem>
          <Divider />
          <MenuItem button key="skip" className="list-item">
            <button className="auth-btn nav-link-item" onClick={handleSkip}>
              <i className="fas fa-forward"><span className="list-text">&nbsp; Skip</span></i>

            </button>
          </MenuItem>
          <Divider />
        </List>
      </Drawer>

    </div >
  );

}

export default Navbar