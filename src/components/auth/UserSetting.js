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
        console.log(user["providerData"][0]["providerId"]);
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
        });
    }
    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;

        // updates name
        user.updateProfile({
            displayName: this.state.name
        }).then(function () {
            console.log("Changed name!")
        }).catch(function (error) {
            console.log(error)
        });

        // updates email
        user.updateEmail(this.state.email).then(function () {
            console.log("Changed email!")
        }).catch(function (error) {
            alert(error)
        });
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
                                        {/*https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user*/}
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly className="form-control" id="staticEmail" value={this.state.email || 'None'} onChange={this.handleChangeEmail}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticPassword" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            {/* Link to reset password 
                                        https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email */}
                                            <a href="#" className="col-sm-2 col-form-label">Click here to reset your password.</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
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