import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios'
import 'firebase/firestore';
import AnimeModal from '../info/AnimeModal.js'

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
        var scrollPos = $(document).scrollTop() - 700;
        $('#animeModal').css("top", scrollPos + "px");
    }

    render() {
        const animeList = this.props.output;
        let tempList = null;
        if (this.props.output !== null && this.props.output.length > 0) {
            const myAnimeList = animeList.map(anime => {
                // $('#my-dashboard').css('height', 'auto');
                // $('.dashboard-items').css('transform', 'translate(-1%,156%)');


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
        // eslint-disable-next-line
        const { anime } = this.state;
        // eslint-disable-next-line
        const { anime_genres } = this.state;
        // eslint-disable-next-line
        const { aired } = this.state;
        return (
            <div className="wrapper">
                <AnimeModal anime={this.state.anime} anime_generes={this.state.anime_genres} aired={this.state.aired} />
                <Row id="animes">
                    {tempList}
                </Row>
            </div>
        )
    }
}

export default AnimeList