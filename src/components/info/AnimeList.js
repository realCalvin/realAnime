import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Row } from 'react-bootstrap';
import $ from 'jquery';

class AnimeList extends Component {
    render() {
        const animeList = this.props.output;
        let tempList = null;
        if (this.props.output !== null && this.props.output.length > 0) {
            const myAnimeList = animeList.map(anime => {
                const animeLink = "/anime/" + anime.mal_id;
                $('#my-dashboard').css('height', 'auto');
                $('.dashboard-items').css('transform', 'translate(-1%,156%)');
                return (
                    <div className="col-xs-12 col-sm-6 col-lg-4 col-xl-3 anime-card" key={anime.mal_id}>
                        <div className="well text-center">
                            <img src={anime.image_url} className="anime-image" alt={anime.title}></img>
                            <h6>{anime.title}</h6>
                            <h6>{anime.score}/10</h6>
                            <NavLink to={animeLink} className="blue-anime-button btn btn-primary btn-sm">Anime Details</NavLink>
                        </div>
                    </div>
                )
            })
            tempList = myAnimeList;
        }
        return (
            <Row id="animes">
                {tempList}
            </Row>
        )
    }
}

export default AnimeList