import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import firebase from '../../config/firebase'
import 'firebase/firestore';

class AnimeModal extends Component {

    handleSubscribe = (id, title, img_url, status, episodes, score) => {
        console.log(id);
        var db = firebase.firestore();
        $('#subscribe-notify').css("display", "block");
        setTimeout(function () {
            $('#subscribe-notify').css("display", "none");
        }, 10000);
        if (firebase.auth().currentUser !== null) {
            // https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
            var userId = firebase.auth().currentUser.uid;
            var userAdd = db.collection('users').doc(userId);
            var animeArr = { id, title, img_url, status, episodes, score };
            userAdd.get()
                .then(doc => {
                    if (!doc.exists) { // doc doesn't exit
                        userAdd.set({
                            anime: firebase.firestore.FieldValue.arrayUnion(animeArr)
                        })
                    } else { // doc exists
                        userAdd.update({
                            anime: firebase.firestore.FieldValue.arrayUnion(animeArr)
                        });
                    }
                })
        }

    }

    render() {
        var user = firebase.auth().currentUser;
        const anime = this.props.anime;
        const aired = this.props.aired;
        const anime_genres = this.props.anime_genres;
        console.log(anime)
        return (
            <div className="modal anime-modal fade" id="animeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                    <div className="modal-content anime-modal-content">
                        <div className="modal-header">
                            <Row className="modal-title">
                                <div className="col-md-12 col-lg-6">
                                    <img src={anime.image_url} className="hot-anime-image" alt={anime.title}></img>
                                </div>
                                <div className="col-md-12 col-lg-6 anime-info">
                                    <h4>{anime.title}</h4>
                                    <ul className="anime-info">
                                        <li className="anime-info-item"><strong>Type: </strong>{anime.type}</li>
                                        <li className="anime-info-item"><strong>Score: </strong>{anime.score}/10</li>
                                        <li className="anime-info-item"><strong>Status: </strong>{anime.status}</li>
                                        <li className="anime-info-item"><strong>Episodes: </strong>{anime.episodes}</li>
                                        <li className="anime-info-item"><strong>Aired: </strong>{aired}</li>
                                        <li className="anime-info-item"><strong>Genre: </strong>{anime_genres}</li>
                                        <li className="anime-info-item"><strong>Rating: </strong>{anime.rating}</li>
                                    </ul>
                                </div>
                            </Row>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Row>
                                <div className="well anime-synopsis">
                                    <h5>Synopsis</h5>
                                    <p>{anime.synopsis}</p>
                                    <hr />
                                </div>
                            </Row>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <Row>
                                {user ? (<button to="#" onClick={() => { this.handleSubscribe(anime.mal_id, anime.title, anime.image_url, anime.status, anime.episodes, anime.score) }} className="nav-anime-btn btn btn-success btn-sm">Subscribe</button>) : (<div></div>)}
                                <a href={anime.url} className="nav-anime-btn btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View MyAnimeList</a>
                                <div id="subscribe-notify">You have added this to your subscription! Refresh the page to view on your anime list. \ (•◡•) /</div>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AnimeModal