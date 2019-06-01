import React, { Component } from 'react'

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
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
            <div className="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="registerLabel">Register</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="login-form">
                                <h6>Email: </h6>
                                <input type="email" name="email" className="form-control center-block" placeholder="Your Email" required /><br />
                                <h6>Password: </h6>
                                <input type="password" name="password" className="form-control center-block" placeholder="Your Password" required />
                                <br />
                                <h6>Phone Number: </h6>
                                <input type="text" name="phone" className="form-control center-block" placeholder="Optional" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary form-control center-block" id="register-submit">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp