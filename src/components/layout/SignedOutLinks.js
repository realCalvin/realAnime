import React from 'react';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/ListItem';
import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'

const SignedOutLinks = () => {
    return (
        < div >
            <SignIn />
            <SignUp />
            <MenuItem button key="login" className="list-item">
                <button className="auth-btn nav-link-item" data-toggle="modal" data-target="#loginModal"><i className="fas fa-sign-in-alt">&nbsp; <span className="list-text">Login/Register</span></i></button>
            </MenuItem>
            <Divider />
        </div >
    )
}
export default SignedOutLinks