const base_url = "https://api.jikan.moe/v3/search/anime?q=" +  "&page=1";

// loading animation


$(document).ready(function(){
	// gets user input in search box
	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
        $('#animes').css("display", "none");
        $('.preload').css("display", "block");
		getAnimes(searchText);

		// stop form from actually submitting
		e.preventDefault(); 
	});
});

// gets related anime names on the text from user
function getAnimes(searchText){
	axios.get('https://api.jikan.moe/v3/search/anime?q=' + searchText + "&page=1")
		.then((response) => {
			console.log(response);
			// holds an array of all the anime objects from search
			let animes = response.data.results;
			let output = '';
			$.each(animes, (index, anime) => {
				output += `
					<div class="col-md-3 anime-card">
						<div class="well text-center">
							<img src="${anime.image_url}" class="anime-image">
							<h6>${anime.title}</h6>
							<h7>${anime.score}/10</h7>
							<br>
							<a onclick="animeSelected('${anime.mal_id}')" class="anime-button btn btn-primary btn-sm" href="#">Anime Details</a>
						</div>
					</div>
				`;
			});

			$('#animes').html(output);
            $('.preload').css("display", "none");
            $('#animes').css("display", "flex");
		})
		.catch((err) => {
			console.log(err);
		});
}

function animeSelected(id){
	sessionStorage.setItem('animeID', id);
	window.location = 'anime.html';
	return false;
}

function getAnime(){
	// get the id stored in sesssionStorage
	let animeID = sessionStorage.getItem('animeID');

	axios.get('https://api.jikan.moe/v3/anime/' + animeID)
		.then((response) => {
			console.log(response);
			let anime = response.data;
			let anime_genres = '';
			for(var i=0; i<anime.genres.length; i++){
				anime_genres += anime.genres[i].name
				if(i != anime.genres.length-1){
					anime_genres += ', '
				}
			}
			let output = `
				<div class="row">
					<div class="col-md-4">
						<img src="${anime.image_url}" class="anime-image">
					</div>
					<div class="col-md-8 anime-info">
						<h4>${anime.title}</h4>
						<ul class="anime-info">
							<li class="anime-info-item"><strong>Type: </strong>${anime.type}</li>
							<li class="anime-info-item"><strong>Score: </strong>${anime.score}/10</li>
							<li class="anime-info-item"><strong>Status: </strong>${anime.status}</li>
							<li class="anime-info-item"><strong>Episodes: </strong>${anime.episodes}</li>
							<li class="anime-info-item"><strong>Aired: </strong>${anime.aired.string}</li>
							<li class="anime-info-item"><strong>Genre: </strong>${anime_genres}</li>
							<li class="anime-info-item"><strong>Rating: </strong>${anime.rating}</li>
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="well anime-synopsis">
						<h5>Synopsis</h5>
						<p>${anime.synopsis}</p>
						<hr>
						<a href="index.html" class="red-anime-button btn btn-danger btn-sm" href="#">Back</a>
						<a href="${anime.url}" class="blue-anime-button btn btn-primary btn-sm" target="_blank">View MyAnimeList</a>
						<a href="#" class="green-anime-button btn btn-success btn-sm" href="#">Subscribe</a>
					</div>
				</div>
			`;
			$('#anime').html(output);
            $('.preload').css({"display":"none", "position":"absolute"});
            $('#anime').css("display", "block");
		})
		.catch((err) => {
			console.log(err);
		});
}
