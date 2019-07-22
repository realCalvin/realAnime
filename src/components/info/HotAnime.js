import React, { Component } from 'react';
import $ from 'jquery';
import { Row } from 'react-bootstrap';
import axios from 'axios'
import 'firebase/firestore';

class HotAnime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animeList: null,
            anime: ''
        }
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
                console.log(error)
            })
        console.log(this.state.anime)
    }

    handleFilter = (id) => {
        let list = null;
        this.setState({
            animeList: null,
        })
        axios.get("https://api.jikan.moe/v3/top/anime/1/" + id)
            .then((response) => {
                let animes = response.data.top;
                var topAnime = animes.map(anime => {
                    return (
                        <div key={anime.mal_id} className="row hot-anime">
                            <div className="col-md-5 hot-anime-pic">
                                <img className="hot-img" src={anime.image_url} alt={anime.title} onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subHotAnimeInfoModal"></img>
                            </div>
                            <div className="col-md-7 hot-anime-info">
                                <ul className="hot-list">
                                    <li><h4 onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subHotAnimeInfoModal">{anime.title}</h4></li>
                                    <li className="indent">Rank: {anime.rank}</li>
                                    <li className="indent">Date: {anime.start_date} - {anime.end_date}</li>
                                    <li className="indent">Episodes: {anime.episodes ? anime.episodes : "N/A"}</li>
                                    <li className="indent">Score: {anime.score}</li>
                                </ul>
                                <div className="hot-anime-btn">
                                    <button className="btn btn-primary" onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subHotAnimeInfoModal">More Information</button>
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
    }

    componentDidMount() {
        let list = null;
        axios.get("https://api.jikan.moe/v3/top/anime/1/tv")
            .then((response) => {
                let animes = response.data.top;
                var topAnime = animes.map(anime => {
                    return (
                        <div key={anime.mal_id} className="row hot-anime">
                            <div className="col-md-5 hot-anime-pic">
                                <img className="hot-img" src={anime.image_url} alt={anime.title} onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subHotAnimeInfoModal"></img>
                            </div>
                            <div className="col-md-7 hot-anime-info">
                                <ul className="hot-list">
                                    <li><h4 onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subHotAnimeInfoModal">{anime.title}</h4></li>
                                    <li className="indent">Rank: {anime.rank}</li>
                                    <li className="indent">Date: {anime.start_date} - {anime.end_date}</li>
                                    <li className="indent">Episodes: {anime.episodes ? anime.episodes : "N/A"}</li>
                                    <li className="indent">Score: {anime.score}</li>
                                </ul>
                                <div className="hot-anime-btn">
                                    <button className="btn btn-primary" onClick={() => { this.handleModal(anime.mal_id) }} data-toggle="modal" data-target="#subHotAnimeInfoModal">More Information</button>
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
    }

    render() {
        const { anime } = this.state;
        const yt_link = "https://www.youtube.com/embed/?listType=search&list=anime+trailer+" + anime.title + "+&autoplay=1";
        console.log(anime)
        return (
            <div id="hotanime">
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
                                    <button className="btn btn-dark btn-sm btn-filter" onClick={() => { this.handleFilter("") }}>All Animes</button>
                                    <button className="btn btn-dark btn-sm btn-filter" onClick={() => { this.handleFilter("airing") }}>Top Airing</button>
                                    <button className="btn btn-dark btn-sm btn-filter" onClick={() => { this.handleFilter("movie") }}>Top Movies</button>
                                    <button className="btn btn-dark btn-sm btn-filter" onClick={() => { this.handleFilter("upcoming") }}>Top Upcoming</button>
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
                <div className="modal anime-modal fade" id="subHotAnimeInfoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl" role="document">
                        <div className="modal-content anime-modal-content">
                            <div className="modal-header">
                                <Row className="modal-title">
                                    <div className="col-md-12 col-lg-4">
                                        <img src={anime.image_url} className="hot-anime-image" alt={anime.title}></img>
                                    </div>
                                    <div className="col-md-12 col-lg-8 anime-info">
                                        <h4>{anime.title}</h4>
                                        <ul className="anime-info">
                                            <h5>Synopsis</h5>
                                            <p>{anime.synopsis}</p>
                                        </ul>
                                    </div>
                                </Row>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Row>
                                    <div className="well hot-anime-video">
                                        <iframe src={yt_link} title={anime.title} frameBorder="0" allowFullScreen></iframe>
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
        )
    }
}

export default HotAnime