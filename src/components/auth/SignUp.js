import React, { Component } from 'react'

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
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return (
            <div className="modal sign-modal fade" id="registerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="registerLabel">Register</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="login-form" onSubmit={this.handleSubmit}>
                                <h6>Name: </h6>
                                <input type="text" name="name" id="name" className="form-control center-block" placeholder="Your Name" onChange={this.handleChange} required /><br />
                                <h6>Email: </h6>
                                <input type="email" name="email" id="emailsignup" className="form-control center-block" placeholder="Your Email" onChange={this.handleChange} required /><br />
                                <h6>Password: </h6>
                                <input type="password" name="password" id="passwordsignup" className="form-control center-block" placeholder="Your Password" onChange={this.handleChange} required />
                                <br />
                                <h6>Phone Number: </h6>
                                <input type="text" name="phone" id="phone" className="form-control center-block" placeholder="Optional" onChange={this.handleChange} />
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary form-control center-block" id="register-submit" >Register</button>
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