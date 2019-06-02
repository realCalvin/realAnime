import React, { Component } from 'react'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emaillogin: '',
            passwordlogin: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <div className="modal sign-modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="loginLabel">Login</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="login-form" onSubmit={this.handleSubmit}>
                                <h6>Email: </h6>
                                <input type="email" name="email" id="emaillogin" className="form-control center-block" placeholder="Your Email" onChange={this.handleChange} required /><br />
                                <h6>Password: </h6>
                                <input type="password" name="password" id="passwordlogin" className="form-control center-block" placeholder="Your Password" onChange={this.handleChange} required />
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary form-control center-block" id="login-submit">Submit</button>
                                    <button type="button" className="btn btn-secondary form-control center-block" id="login-forget">Forgot Password</button>
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