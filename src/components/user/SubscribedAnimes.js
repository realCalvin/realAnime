import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import firebase from '../../config/firebase'
import 'firebase/firestore';

class SubscribedAnimes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animeList: null
        }
    }

    handleDelete = (id, title, img_url, status, episodes, score) => {
        let user = firebase.auth().currentUser;
        var db = firebase.firestore();
        var deleteAnime = db.collection('users').doc(user.uid);
        var animeArr = { id, title, img_url, status, episodes, score };
        deleteAnime.update({
            anime: firebase.firestore.FieldValue.arrayRemove(animeArr)
        });
        $('#animeDeleted').css("display", "block");
        setTimeout(function () {
            $('#animeDeleted').css("display", "none");
        }, 10000);
    }

    componentDidUpdate() {
        let user = firebase.auth().currentUser;
        let list = null;
        if (user != null) {
            var db = firebase.firestore();
            var myAnime = db.collection('users').doc(user.uid);
            myAnime.get().then(result => {
                var animes = result.data().anime;
                var counter = -1;
                if (result.exists) {
                    var animeList = animes.map(anime => {
                        counter++;
                        return (
                            <div key={anime.id} className="subscribedAnimes">
                                <img className="subImg" src={anime.img_url} alt={anime.title}></img>
                                <div className="subscribedInfo">
                                    <ul>
                                        <li><h6>{anime.title}</h6></li>
                                        <li className="indent">Status: {anime.status}</li>
                                        <li className="indent">Episodes: {anime.episodes ? anime.episodes : "N/A"}</li>
                                        <li className="indent">Score: {anime.score}</li>
                                        <button className="btn sub-btn btn-default" onClick={() => { this.handleNotify() }}>Notify Me (~˘▾˘)~</button>
                                        <button className="btn delete-btn btn-default" onClick={() => this.handleDelete(anime.id, anime.title, anime.img_url, anime.status, anime.episodes, anime.score)}>Delete</button>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                    list = animeList;
                }
            }).catch(error => {
                console.log("error")
            }).then(() => {
                if (this.state.animeList == null) {
                    this.setState({
                        animeList: list
                    })
                }
            })
        }
    }

    render() {

        return (
            <div className="wrapper">
                <div className="modal fade" id="subAnimeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xs" role="document">
                        <div className="modal-content anime-modal-content">
                            <div className="modal-header">
                                <Row className="modal-title">
                                    <h2 className="h-center">Your Anime List</h2>
                                </Row>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Row id="yourAnimeList">
                                    <div id="animeDeleted">You have removed the anime from your subscription!<br></br>Refresh the page to view your updated anime list. \ (•◡•) /</div>
                                    {this.state.animeList}
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubscribedAnimes