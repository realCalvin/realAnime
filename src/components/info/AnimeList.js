import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios'
import firebase from '../../config/firebase'
import 'firebase/firestore';

class AnimeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            anime: '',
            anime_genres: '',
            aired: '',
            scrollPos: null,
        }
    }

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

    storeId = (id) => {
        this.setState({
            id: id
        })
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
                console.log(anime.title);
                this.setState({
                    anime: anime,
                    anime_genres: anime_genres,
                    aired: anime.aired.string,
                })
            })
            .catch((error) => {
                console.log(error)
            })
        var scrollPos = $(document).scrollTop() - 700;
        $('#animeModal').css("top", scrollPos + "px");
    }

    render() {
        var user = firebase.auth().currentUser;

        const animeList = this.props.output;
        let tempList = null;
        if (this.props.output !== null && this.props.output.length > 0) {
            const myAnimeList = animeList.map(anime => {
                $('#my-dashboard').css('height', 'auto');
                $('.dashboard-items').css('transform', 'translate(-1%,156%)');


                if (anime.title.length > 45) {
                    var counter = 0, title = "", dot;
                    while (counter < 45) {
                        title += anime.title[counter];
                        counter++;
                    }
                    dot = new Array(3).join('.');
                    title += dot;
                    anime.title = title;
                }
                console.log(anime.title.length)
                return (
                    <div className="col-xs-12 col-sm-6 col-lg-4 col-xl-3 anime-card" key={anime.mal_id}>
                        <div className="well text-center">
                            <img src={anime.image_url} className="anime-image" alt={anime.title}></img>
                            <h6>{anime.title}</h6>
                            <h6>{anime.score}/10</h6>
                            <button className="blue-anime-button btn btn-primary btn-sm" onClick={() => { this.storeId(anime.mal_id) }} data-toggle="modal" data-target="#animeModal">Anime Details</button>
                        </div>
                    </div>
                )
            })
            tempList = myAnimeList;
        }
        const { anime } = this.state;
        const { anime_genres } = this.state;
        const { aired } = this.state;
        return (
            <div className="wrapper">
                <div className="modal fade" id="animeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                    {user ? (<button to="#" onClick={() => { this.handleSubscribe(anime.mal_id, anime.title, anime.image_url, anime.status, anime.episodes, anime.score) }} className="nav-anime-btn btn btn-success btn-sm">Subscribe</button>) : (<div></div>)}
                                    <a href={anime.url} className="nav-anime-btn btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View MyAnimeList</a>
                                    <div id="subscribe-notify">You have added this to your subscription! Refresh the page to view on your anime list. \ (•◡•) /</div>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <Row id="animes">
                    {tempList}
                </Row>
            </div>
        )
    }
}

export default AnimeList