import React from 'react';
import { NavLink } from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/ListItem';

const SignedOutLinks = () => {
    return (
        <div>
            <MenuItem button key="login" className="list-item">
                <NavLink to="/login" className="nav-link-item"><i className="fas fa-sign-in-alt">&nbsp; <span className="list-text">Login</span></i></NavLink>
            </MenuItem>
            <Divider />
            <MenuItem button key="register" className="list-item">
                <NavLink to="/register" className="nav-link-item"><i className="fas fa-user">&nbsp; <span className="list-text">Register</span></i></NavLink>
            </MenuItem>
            <Divider />
        </div>
    )
}
export default SignedOutLinks