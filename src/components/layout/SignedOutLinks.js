import React from 'react';
import { NavLink } from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

const SignedOutLinks = () => {
    return (
        <div>
            <ListItem button key="login" className="list-item">
                <NavLink to="#" className="nav-link-item"><i className="fas fa-sign-in-alt">&nbsp; <span className="list-text">Login</span></i></NavLink>
            </ListItem>
            <Divider />
            <ListItem button key="register" className="list-item">
                <NavLink to="#" className="nav-link-item"><i className="fas fa-user">&nbsp; <span className="list-text">Register</span></i></NavLink>
            </ListItem>
            <Divider />
        </div>
    )
}
export default SignedOutLinks