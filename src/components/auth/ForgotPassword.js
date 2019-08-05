import React, { Component } from 'react'
import firebase from '../../config/Firebase.js'

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetPassword = (e) => {
        e.preventDefault();
        var auth = firebase.auth();
        var emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress)
            .then((result) => {
                alert("Sent! Check your email to reset.");
            })
            .catch((error) => {
                console.log(error);
                switch (error.code) {
                    case "auth/invalid-email":
                        alert("Invalid email. Try again.");
                        break;
                    default:
                        alert(error);
                }
            })
    }

    render() {
        return (
            <div className="modal sign-modal fade" id="forgotPasswordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="forgotPasswordLabel">Forgot Password</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="login-form" onSubmit={this.resetPassword}>
                                <h6>Email: </h6>
                                <input type="text" name="email" className="form-control center-block" placeholder="Your Email" onChange={this.handleChange} required /><br />
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary form-control center-block" >Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword