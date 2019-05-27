import React from 'react';
import { NavLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import {UserPic} from './user.png'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

const SignedInLinks = () => {
    return (
        <div>
            <ListItem button key="user" className="list-item">
                <Avatar src={UserPic} className="userProfileImg"/><h3 className="userName">Name</h3>
            </ListItem>
            <Divider />
            <ListItem button key="home" className="list-item">
                <NavLink to="#" className="nav-link-item"><i className="fas fa-home">&nbsp; <span className="list-text">Home</span></i></NavLink>
            </ListItem>
            <Divider />
            <ListItem button key="account" className="list-item">
                <NavLink to="#" className="nav-link-item"><i className="fas fa-list-ul">&nbsp; <span className="list-text">Anime List</span></i></NavLink>
            </ListItem>
            <Divider />
            <ListItem button key="settings" className="list-item">
                <NavLink to="#" className="nav-link-item"><i className="fas fa-cog">&nbsp; <span className="list-text">Settings</span></i></NavLink>
            </ListItem>
            <Divider />
        </div>
    )
}
export default SignedInLinks