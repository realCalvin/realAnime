import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios'
import firebase from '../../config/firebase'
import 'firebase/firestore';

class HotAnime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animeList: null,
        }
    }

    render() {
        let list = null;
        axios.get("https://api.jikan.moe/v3/top/anime/1/tv")
            .then((response) => {
                let animes = response.data.top;
                var topAnime = animes.map(anime => {
                    console.log(anime)
                    return (
                        <div key={anime.mal_id} className="row hot-anime">
                            <div className="col-md-5 hot-anime-pic">
                                <img className="hot-img" src={anime.image_url} alt={anime.title} onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subAnimeInfoModal"></img>
                            </div>
                            <div className="col-md-7 hot-anime-info">
                                <ul className="hot-list">
                                    <li><h4 onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subAnimeInfoModal">{anime.title}</h4></li>
                                    <li className="indent">Rank: {anime.rank}</li>
                                    <li className="indent">Date: {anime.start_date} - {anime.end_date}</li>
                                    <li className="indent">Episodes: {anime.episodes ? anime.episodes : "N/A"}</li>
                                    <li className="indent">Score: {anime.score}</li>
                                </ul>
                                <div className="hot-anime-btn">
                                    <button class="btn btn-primary">More Information</button>
                                </div>
                            </div>
                        </div>
                    )
                });
                list = topAnime;
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                if (this.state.animeList == null) {
                    this.setState({
                        animeList: list,
                    })
                }
            })

        return (
            <div className="modal anime-modal fade" id="hotAnimeModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                    <div className="modal-content anime-modal-content">
                        <div className="modal-header">
                            <Row className="modal-title">
                                <h1>Hot Animes</h1>
                            </Row>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Row>
                                <button className="btn btn-dark btn-sm btn-filter">All Animes</button>
                                <button className="btn btn-dark btn-sm btn-filter">Top Airing</button>
                                <button className="btn btn-dark btn-sm btn-filter">Top Movies</button>
                                <button className="btn btn-dark btn-sm btn-filter">Top Upcoming</button>
                            </Row>
                            <Row>
                                <div className="well anime-synopsis">
                                    {this.state.animeList}
                                </div>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HotAnime