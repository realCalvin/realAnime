import React, {Component} from 'react';
import $ from 'jquery';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import Search from './Search'
import { Col, Jumbotron, Row } from 'react-bootstrap';

class Dashboard extends Component {
    state = {
        title: null,
        image_url: null,
        type: null,
        score: null,
        status: null,
        episodes: null,
        aired: null,
        genre: null,
        rating: null,
        sypnosis: null,
        output: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        this.setState({
            ...this.state,
            title: searchText
        }, () => {
            this.getAnimes(this.state.title);
        })
    }

    getAnimes = (searchName) => {
        let output = '';
        axios.get('https://api.jikan.moe/v3/search/anime?q=' + searchName + '&page=1')
            .then((response) => {
                let animes = response.data.results;
                $.each(animes, (index, anime) => {
                    output += `
                    <div class="col-md-3 anime-card">
                        <div class="well text-center">
                            <img src="${anime.image_url}" class="anime-image">
                            <h6>${anime.title}</h6>
                            <h7>${anime.score}/10</h7>
                            <br>
                            <NavLink onclick="animeSelected('${anime.mal_id}')" class="blue-anime-button btn btn-primary btn-sm" to="#">Anime Details</NavLink>
                        </div>
                    </div>
                    `;
                });
                this.setState({
                    ...this.state,
                    output
                })
                console.log(output)
                $('#animes').html(output);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <div className="container dashboard">
                    <div className="row">
                        <Search handleSubmit={this.handleSubmit}/>
                    </div>
                </div>
                <div className="container anime-list">
                    <Row id="animes">
                        
                    </Row>
                </div>
            </div>
        )
    }
}
export default Dashboard