import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import firebase from '../../config/firebase'
import 'firebase/firestore';

class UserSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animeList: null,
            name: null,
            email: null,
            uid: null,
            emailVerified: null,
            nameChanged: false,
            emailChanged: false,
        }
    }

    componentDidUpdate() {
        var user = firebase.auth().currentUser;
        var name, email, uid, emailVerified;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            emailVerified = user.emailVerified;
            uid = user.uid;
            if (this.state.name == null) {
                this.setState({
                    name: name,
                    email: email,
                    uid: uid,
                    emailVerified: emailVerified,
                })
            }
        }
    }

    handleEdit = () => {
        $('input').each(function () {
            var inp = $(this);
            if (inp.attr('readonly')) {
                inp.removeAttr('readonly');
                inp.removeAttr('value');
            }
            else {
                inp.attr('readonly', 'readonly');
            }
        });
    }
    handleChangeName = (e) => {
        this.setState({
            name: e.target.value,
            nameChanged: true,
        });
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            emailChanged: true,
        });
    }
    handleReset = (e) => {
        e.preventDefault();
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email).then(function () {
            alert("Password reset link sent to your primary email.")
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;

        // updates name
        user.updateProfile({
            displayName: this.state.name
        }).then(function () {
        }).catch(function (error) {
            console.log(error)
        });

        // updates email
        user.updateEmail(this.state.email).then(function () {
            user.sendEmailVerification().then(function () {
            }).catch(function (error) {
                console.log(error)
            })

        }).catch(function (error) {
            console.log(error)
        });

        if (this.state.nameChanged === true && this.state.emailChanged === true) {
            alert("Name Changed and Email Changed. Check For Email Verification Link!")
        }
        else if (this.state.nameChanged === true && this.state.emailChanged === false) {
            alert("Name Changed. Refresh to See Updated Name!")
        }
        else if (this.state.nameChanged === false && this.state.emailChanged === true) {
            alert("Email Changed. Check For Email Verification Link!")
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="modal fade" id="settingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                        <div className="modal-content anime-modal-content">
                            <div className="modal-header">
                                <Row className="modal-title">
                                    <h2 className="h-center">Your Settings &nbsp;<button id="edit" className="btn btn-secondary btn-sm" onClick={this.handleEdit}>Edit</button></h2>
                                </Row>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label htmlFor="staticName" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly className="form-control" id="staticName" value={this.state.name || 'None'} onChange={this.handleChangeName}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly className="form-control" id="staticEmail" value={this.state.email || 'None'} onChange={this.handleChangeEmail}></input>
                                            <div className="email-verified-msg">&nbsp;
                                                {this.state.emailVerified ? <i id="verified">Email Verified <i className="fas fa-check"></i></i> : <i id="not-verified">Email Not Verified <i className="fas fa-times"></i></i>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticPassword" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10 reset-password">
                                            <button onClick={this.handleReset} className="btn btn-link col-sm-2 col-form-label">Click here to reset your password.</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {!this.state.emailVerified ? <button className="btn btn-danger">Resend verification email</button> : <div></div>}
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UserSetting