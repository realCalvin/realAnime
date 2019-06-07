import React, { Component } from 'react'
import firebase from '../../config/firebase'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
class SignIn extends Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            emaillogin: '',
            passwordlogin: '',
        }
    }

    login = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.emaillogin, this.state.passwordlogin).then((u) => {
        }).catch((error) => {
            console.log(error);
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Wrong password. Try again.");
                    break;
                default:
                    alert(error);
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // check if device is mobile.. used to choose method for login (popup or redirect)
    isMobile = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    handleGoogleLogin = (e) => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();

        if (this.isMobile()) { // mobile device; redirect page
            console.log("MOBILE");
            firebase.auth().signInWithRedirect(provider)
                .then((result) => {
                    // The signed-in user info.
                    var user = result.user;
                    console.log(user);
                })
                .catch((error) => {
                    alert(error);
                })
        } else { // normal device; popup page
            console.log("NOT MOBILE")
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // The signed-in user info.
                    var user = result.user;
                    console.log(user);
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    handleFacebookLogin = (e) => {
        e.preventDefault();
        var provider = new firebase.auth.FacebookAuthProvider();

        if (this.isMobile()) {
            console.log("MOBILE");
            firebase.auth().signInWithRedirect(provider)
                .then((result) => {
                    // The signed-in user info.
                    var user = result.user;
                    console.log(user);
                })
                .catch((error) => {
                    alert(error);
                })
        } else {
            console.log("NOT MOBILE")
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // The signed-in user info.
                    var user = result.user;
                    console.log(user);
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    render() {
        return (
            <div>
                <div className="modal sign-modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="loginLabel"> <button className="btn btn-sm auth-selected-btn sign-in-up-btn">Login</button> <button className="btn btn-sm sign-in-up-btn" data-dismiss="modal" data-toggle="modal" data-target="#registerModal">Register</button> </h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="login-form" onSubmit={this.login}>
                                    <h6>Email: </h6>
                                    <input type="email" name="email" id="emaillogin" className="form-control center-block" placeholder="Your Email" onChange={this.handleChange} required /><br />
                                    <h6>Password: </h6>
                                    <input type="password" name="password" id="passwordlogin" className="form-control center-block" placeholder="Your Password" onChange={this.handleChange} required />
                                    <div className="modal-footer" id="modal-auth-sign-in">
                                        <button type="submit" className="btn btn-primary form-control center-block" id="login-submit">Login</button>
                                        <button type="button" className="btn btn-secondary form-control center-block" data-dismiss="modal" data-toggle="modal" data-target="#forgotPasswordModal" id="password-forget">Forgot Password</button>
                                    </div>
                                    <div className="modal-footer">
                                        <div id="modal-sign-in">
                                            <button type="button" onClick={this.handleGoogleLogin} className="btn google-auth-btn form-control center-block" id="login-google"><i className="fab fa-google"></i> Login with Google</button>
                                            <button type="button" onClick={this.handleFacebookLogin} className="btn facebook-auth-btn  form-control center-block" id="login-facebook"><i className="fab fa-facebook-square"></i> Login with Facebook</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ForgotPassword />
                <SignUp />

            </div>
        )
    }
}

export default SignIn