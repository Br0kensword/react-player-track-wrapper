import React from 'react';
import GenreListItem from './genre-list-item';

const GenreList = (props) => {
	var genreName = "";
	var genreSong = ""; 

	function handleNameChange(event) {
    	 genreName= event.target.value;
    	return;
  	};

  	function handleSongChange(event) {
    	genreSong = event.target.value;
    	return;
  	};

  	 function clearInput() {
  		document.getElementById('genre').value = "";
  		document.getElementById('song').value = "";
  		return;
  	};

  	if (!props.genres){
		return <div>
				 <p>Add a genre and a song to start</p>

				 <div id="genreChange">
					<input className='out-int' type="text" placeholder="Genre" onChange={handleNameChange} id='genre'/>
					<input className='out-int' type="text" placeholder="Song" onChange={handleSongChange} id="song"/>
				 </div>

				 <button className='out-btn' onClick={() => {props.addGenre(genreName, [genreSong]); clearInput()}} >Add Genre +</button>

				</div>
	}

 	const genreItems = props.genres.map((genre) =>{
		return <GenreListItem onGenreSelect={props.onGenreSelect} addTrack={props.addTrack}
			 nextSong={props.nextSong} key={genre.title} genre={genre} deleteGenre={props.deleteGenre} />
			});

	return (
		<ul className="col-md-4 list-group pull-right">
			{genreItems}
			
			<div id="genreChange">
					<input className='out-int' type="text" placeholder="Genre" onChange={handleNameChange} id='genre'/>
					<input className='out-int' type="text" placeholder="Song" onChange={handleSongChange} id="song"/>
			</div>

			<button className='out-btn' onClick={() => {props.addGenre(genreName, [genreSong]); clearInput()}} >Add Genre +</button>
		</ul>

		);
};


export default GenreList;