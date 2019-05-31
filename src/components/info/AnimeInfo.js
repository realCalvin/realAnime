import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import axios from 'axios'

class AnimeInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			anime: '',
			anime_genres: '',
			aired: '',
		}
	}

	componentDidMount() {
		const animeID = this.props.match.params.id;
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

	render() {
		const { anime } = this.state;
		const { anime_genres } = this.state;
		const { aired } = this.state;
		console.log(anime)
		return (
			<div className="container anime-list">
				<Row>
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
				<Row>
					<div className="well anime-synopsis">
						<h5>Synopsis</h5>
						<p>{anime.synopsis}</p>
						<hr />
						<NavLink exact to="/" className="nav-anime-btn btn btn-danger btn-sm">Back</NavLink>
						<a href={anime.url} className="nav-anime-btn btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">View MyAnimeList</a>
						<NavLink to="#" className="nav-anime-btn btn btn-success btn-sm">Subscribe</NavLink>
					</div>
				</Row>
			</div>
		)
	}
}
export default AnimeInfo