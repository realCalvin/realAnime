import React, { Component } from 'react'
import Firebase from '../../config/Firebase'

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
        Firebase.auth().createUserWithEmailAndPassword(this.state.emailsignup, this.state.passwordsignup)
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
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
                                <h6>Phone Number: </h6>
                                <input type="text" name="phone" className="form-control center-block" placeholder="Optional" onChange={this.handleChange} />
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