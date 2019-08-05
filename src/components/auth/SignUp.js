import React, { Component } from 'react'
import firebase from '../../config/firebase'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailsignup: '',
            passwordsignup: '',
            name: '',
            phone: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.emailsignup, this.state.passwordsignup)
            .then((data) => {
                data.user.sendEmailVerification();
                alert("Account created. Verify your email if you would like to access our functionalities!")
                console.log(data.user.uid);
                data.user.updateProfile({
                    displayName: this.state.name,
                })

            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        alert("The new user account cannot be created because the email is already in use.");
                        break;
                    case "INVALID_EMAIL":
                        alert("The specified email is not a valid email.");
                        break;
                    default:
                        alert("Error creating user:", error);
                }
            })
    }

    render() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
            } else {
                // No user is signed in.
            }
        });
        return (
            <div className="modal sign-modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="registerLabel"><button className="btn btn-sm sign-in-up-btn" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">Login</button> <button className="btn btn-sm auth-selected-btn sign-in-up-btn">Register</button></h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="login-form" onSubmit={this.register}>
                                <h6>Name: </h6>
                                <input type="text" name="name" className="form-control center-block" placeholder="Your Name" onChange={this.handleChange} required /><br />
                                <h6>Email: </h6>
                                <input type="email" name="emailsignup" className="form-control center-block" placeholder="Your Email" onChange={this.handleChange} required /><br />
                                <h6>Password: </h6>
                                <input type="password" name="passwordsignup" className="form-control center-block" placeholder="Your Password" onChange={this.handleChange} required />
                                <br />
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary form-control center-block" >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp