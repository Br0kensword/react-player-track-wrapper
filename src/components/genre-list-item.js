import React from 'react';
//import pic from '../../img/baking-pusheen.jpg'

const GenreListItem = ({genre, onGenreSelect, addTrack, nextSong, deleteGenre}) => {

	const imageURL = 'file:///C:/Users/WinView/Desktop/player/img/baking-pusheen.jpg';
	var trackPath = '';

	function handleChange(event) {
    	trackPath = event.target.value;
    	return;
  	};

  	function clearInput() {
  		document.getElementById(genre.title).value = "";
  		return;
  	}


	return (
		<li className='list-group-item'>

			<div>

				<div className='media-body'>

					<div onClick={() => onGenreSelect(genre)}  className="media-heading">{genre.title}</div>

				</div>

				<div>
					<button className='out-btn' onClick={() => nextSong()}>Next Song</button>
					<button className='out-btn' onClick={() => deleteGenre(genre.title)}>Delete Genre</button>
				</div>

				<div>
					<input className='out-int' type="text" placeholder="add a url or file path" onChange={handleChange} id={genre.title} />
					<button className='out-btn' onClick={() => {addTrack(genre.title, trackPath); clearInput()}}>Add Track</button>
				</div>

				

				
			</div> 

		</li>
		);
};

export default GenreListItem;