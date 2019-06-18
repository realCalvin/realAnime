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
            phoneNumber: null,
            uid: null,
            emailVerified: null
        }
    }

    componentDidUpdate() {
        var user = firebase.auth().currentUser;
        var name, email, phoneNumber, uid, emailVerified;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            phoneNumber = user.phoneNumber;
            emailVerified = user.emailVerified;
            uid = user.uid;
            if (this.state.name == null) {
                this.setState({
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    uid: uid,
                    emailVerified: emailVerified
                })
            }
        }
        console.log(name, email, phoneNumber, uid, emailVerified);
    }

    handleEdit() {

    }

    render() {
        return (
            <div className="wrapper">
                <div className="modal fade" id="settingModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                        <form>
                            <div className="modal-content anime-modal-content">
                                <div className="modal-header">
                                    <Row className="modal-title">
                                        <h2 className="h-center">Your Settings &nbsp;<button className="btn btn-secondary btn-sm" onClick="() => {this.handleEdit()}">Edit</button></h2>
                                    </Row>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label htmlFor="staticName" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly className="form-control" id="staticName" value={this.state.name || 'None'}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        {/*https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user*/}
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly className="form-control" id="staticEmail" value={this.state.email || 'None'}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        {/* Link to reset password 
                                        https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email */}
                                        <label htmlFor="staticPassword" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <input type="password" readOnly className="form-control" id="staticPassword" value={'********'}></input>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="staticPhoneNumber" className="col-sm-2 col-form-label">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="text" readOnly className="form-control" id="staticPhoneNumber" value={this.state.phoneNumber || 'None'}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSetting