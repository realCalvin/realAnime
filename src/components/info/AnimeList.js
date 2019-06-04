import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios'

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

    storeId = (id) => {
        this.setState({
            id: id
        })
        var scrollPos = $(document).scrollTop() - 700;
        $('#animeModal').css("top", scrollPos + "px");
    }

    componentDidUpdate() {
        if (this.state.id != null) {
            const animeID = this.state.id;
            axios.get('https://api.jikan.moe/v3/anime/' + animeID)
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
        }
    }

    render() {
        const animeList = this.props.output;
        let tempList = null;
        if (this.props.output !== null && this.props.output.length > 0) {
            const myAnimeList = animeList.map(anime => {
                $('#my-dashboard').css('height', 'auto');
                $('.dashboard-items').css('transform', 'translate(-1%,156%)');
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
                                    <a href={anime.url} className="nav-anime-btn btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View MyAnimeList</a>
                                    <NavLink to="#" className="nav-anime-btn btn btn-success btn-sm">Subscribe</NavLink>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <Row id="animes">
                    {tempList}
                </Row>
            </div >
        )
    }
}

export default AnimeList