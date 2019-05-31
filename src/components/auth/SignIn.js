import React, { Component } from 'react'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
            <div className="container form-box">
                <form onSubmit={this.handleSubmit} className="signin-form">
                    <h3>Sign In</h3>
                    <div className="form-group row">
                        <div className="col-md-7 col-sm-7">
                            <input type="email" className="form-control" id="email" placeholder="Email" onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-7 col-sm-7">
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" value="Submit" className="btn btn-sm btn-primary">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn