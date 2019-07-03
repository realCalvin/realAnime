import React from 'react';
import { NavLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import { UserPic } from './user.png'
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/ListItem';
import firebase from '../../config/firebase'
import SubscribedAnimes from '../user/SubscribedAnimes.js'
import UserSetting from '../auth/UserSetting.js'

const SignedInLinks = () => {

    let user = firebase.auth().currentUser;
    let name;

    if (user != null) {
        name = user.displayName;
        // photoUrl = user.photoURL;
        // emailVerified = user.emailVerified;
    }

    const logout = (e) => {
        firebase.auth().signOut();
    }

    return (
        < div >
            <MenuItem button key="user" className="list-item user-img" data-toggle="modal" data-target="#settingModal">
                <Avatar src={UserPic} className="userProfileImg" /><h3 className="userName">{name}</h3>
            </MenuItem>
            <Divider />
            <MenuItem button key="home" className="list-item">
                <NavLink exact to="/" className="nav-link-item"><i className="fas fa-home">&nbsp; <span className="list-text">Home</span></i></NavLink>
            </MenuItem>
            <Divider />
            <MenuItem button key="account" className="list-item">
                <button className="auth-btn nav-link-item" data-toggle="modal" data-target="#subAnimeModal"><i className="fas fa-list-ul">&nbsp; <span className="list-text">Anime List</span></i></button>
            </MenuItem>
            <Divider />
            <MenuItem button key="settings" className="list-item">
                <NavLink to="#" className="nav-link-item" data-toggle="modal" data-target="#settingModal"><i className="fas fa-cog">&nbsp; <span className="list-text">Settings</span></i></NavLink>
            </MenuItem>
            <Divider />
            <MenuItem button key="logout" className="list-item">
                <button to="#" onClick={logout} className="auth-btn nav-link-item"><i className="fas fa-sign-out-alt">&nbsp; <span className="list-text">Logout</span></i></button>
            </MenuItem>
            <Divider />
            <SubscribedAnimes />
            <UserSetting />
        </div >
    )
}
export default SignedInLinks