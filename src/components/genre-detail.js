import React from 'react';

const GenreDetail = ({genre, deleteTrack}) => {
	if (!genre){
		return <div>Pick or create a genre to start...</div>;
	}

	const genreItems = genre.tracks.map((songs) =>{
		return( <div key={songs}>
				<li key={songs}>{songs}</li>
				<button className='out-btn' onClick={() => deleteTrack(genre.title, songs)}>Delete</button>
				</div>
			)
			});

	return (
			<div className='video-detail col-md-8'>
				<ul className="col-md-4 list-group">
					{genreItems}
				</ul>
			</div>
		);
};



export default GenreDetail;