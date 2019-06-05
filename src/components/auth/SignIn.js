import React, { Component } from 'react'
import Firebase from '../../config/Firebase'
import SignUp from './SignUp'

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
        Firebase.auth().signInWithEmailAndPassword(this.state.emaillogin, this.state.passwordlogin).then((u) => {
        }).catch((error) => {
            console.log(error);
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary form-control center-block" id="login-submit">Login</button>
                                        <button type="button" className="btn btn-secondary form-control center-block" id="login-forget">Forgot Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <SignUp />

            </div>
        )
    }
}

export default SignIn