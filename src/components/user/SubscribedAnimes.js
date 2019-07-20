import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import firebase from '../../config/firebase'
import 'firebase/firestore';
import axios from 'axios'
// eslint-disable-next-line
import AnimeModal from '../info/AnimeModal.js'

class SubscribedAnimes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animeList: null,
            anime: '',
            anime_genres: '',
            aired: '',
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

    handleModal = (id) => {
        axios.get('https://api.jikan.moe/v3/anime/' + id)
            .then((response) => {
                let anime = response.data;
                let anime_genres = '';
                for (var i = 0; i < anime.genres.length; i++) {
                    anime_genres += anime.genres[i].name
                    if (i !== anime.genres.length - 1) {
                        anime_genres += ', '
                    }
                }
                this.setState({
                    anime: anime,
                    anime_genres: anime_genres,
                    aired: anime.aired.string,
                })
            })
            .catch((error) => {

            })
        console.log(this.state.anime)
    }

    componentDidUpdate() {
        let user = firebase.auth().currentUser;
        let list = null;
        if (user != null) {
            var db = firebase.firestore();
            var myAnime = db.collection('users').doc(user.uid);
            myAnime.get().then(result => {
                var animes = result.data().anime;
                if (result.exists) {
                    var animeList = animes.map(anime => {
                        return (
                            <div key={anime.id} className="subscribedAnimes">
                                <img className="subImg" src={anime.img_url} alt={anime.title} onClick={() => { this.handleModal(anime.id) }} data-toggle="modal" data-target="#subAnimeInfoModal"></img>
                                <div className="subscribedInfo">
                                    <ul>
                                        <li><h6 onClick={() => { this.handleModal(anime.id) }} data-toggle="modal" data-target="#subAnimeInfoModal">{anime.title}</h6></li>
                                        <li className="indent">Status: {anime.status}</li>
                                        <li className="indent">Episodes: {anime.episodes ? anime.episodes : "N/A"}</li>
                                        <li className="indent">Score: {anime.score}</li>
                                        <button className="btn delete-btn btn-default" onClick={() => this.handleDelete(anime.id, anime.title, anime.img_url, anime.status, anime.episodes, anime.score)}>Delete (~˘▾˘)~</button>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                    list = animeList;
                }
            }).catch(error => {

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
        // eslint-disable-next-line
        var user = firebase.auth().currentUser;
        const { anime } = this.state;
        const { anime_genres } = this.state;
        const { aired } = this.state;
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
                <div className="modal anime-modal fade" id="subAnimeInfoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                        <div className="modal-content anime-modal-content">
                            <div className="modal-header">
                                <Row className="modal-title">
                                    <div className="col-md-4">
                                        <img src={anime.image_url} className="anime-image" alt={anime.title}></img>
                                    </div>
                                    <div className="col-md-8 anime-info">
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
                                    <a href={anime.url} className="nav-anime-btn btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View MyAnimeList</a>
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