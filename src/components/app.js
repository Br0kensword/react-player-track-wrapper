import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import _ from 'lodash';
import GenreList from './genre-list';
import GenreDetail from './genre-detail';


export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
      genres: [{title:'battle', tracks: ['https://www.youtube.com/watch?v=Ju_bCrY0nX4']}, {title:'tavern', tracks: ['https://www.youtube.com/watch?v=pdd9b47x67M']}, {title:'forrest', tracks: ['https://www.youtube.com/watch?v=OdIJ2x3nxzQ']}],
      currentGenre: null,
      url: null,
    	playing: false,
    	volume: 1.0,
    	played: 0,
    	loaded: 0,
    	duration: 0,
    	playbackRate: 1.0
  		};

      this.nextSong = this.nextSong.bind(this);
      this.stop = this.stop.bind(this);
      this.save = this.save.bind(this);
      this.load = this.load.bind(this);
      this.playPause = this.playPause.bind(this);
      this.setVolume = this.setVolume.bind(this);
      this.addGenre = this.addGenre.bind(this);
      this.addTrack = this.addTrack.bind(this);
      this.deleteTrack = this.deleteTrack.bind(this);
      this.deleteGenre = this.deleteGenre.bind(this);
      this.crossfade = this.crossfade.bind(this);
	}

  crossfade = (direction) => {
    var fadePoint = this.state.duration - 3;
    var self = this;
    
    if (direction == 0){
      var fadeDownAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((self.state.duration >= fadePoint) && (self.state.volume >= 0.0)) {
            self.setState({volume: (self.state.volume - 0.1)});
            console.log(self.state.volume);
        }
        // When volume at zero stop all the intervalling
        if (self.state.volume <= 0.0) {
            clearInterval(fadeDownAudio);
        }
        }, 200);
    }
    else{
      var fadeUpAudio = setInterval(function () {
        // Only fade if past the fade out point or not at zero already
        if ((self.state.duration >= fadePoint) && (self.state.volume <= 1.0)) {
            self.setState({volume: (self.state.volume + 0.1)});
        }
        // When volume at zero stop all the intervalling
        if (self.state.volume >= 1.0) {
            clearInterval(fadeUpAudio);
        }
    }, 200);
    }
  }

  nextSong = () => {
    //var self = this;
    //this.crossfade(0);
    //var nextTrack = "";
    //setTimeout(function(){ nextTrack = _.sample(self.state.currentGenre.tracks); }, 3000);
    var nextTrack = _.sample(this.state.currentGenre.tracks);
    while (nextTrack == this.state.url) {
      nextTrack = _.sample(this.state.currentGenre.tracks);
    }

    this.setState({url:nextTrack, playing:true});

  }

  addTrack = (title,song) => {
    if(song == ""){
      alert("You need to add a song");
      return;
    }
    var genreState = this.state.genres.slice();
    var genreIndex = genreState.findIndex(function(genre){
      return genre.title == title;
    });

    var selectedGenre = genreState[genreIndex];
    selectedGenre.tracks.push(song);

    this.setState({genres: genreState});
  }

  addGenre = (name, songs) => {
    if(name == "" || songs == ""){
      alert("You need to add both a genre name and a song");
      return
    }
    var newGenre = {title:name, tracks:songs};
    this.setState({genres: this.state.genres.concat([newGenre])});
  }

  deleteTrack = (title, song) => {

    var genreState = this.state.genres.slice();
    var genreIndex = genreState.findIndex(function(genre){
      return genre.title == title;
    });

    var selectedGenre = genreState[genreIndex];
    var songIndex = selectedGenre.tracks.indexOf(song);

    selectedGenre.tracks.splice(songIndex,1);

    this.setState({genres: genreState});

  }

  deleteGenre = (title) => {

    var genreState = this.state.genres.slice();
    var genreIndex = genreState.findIndex(function(genre){
      return genre.title == title;
    });
 
    genreState.splice(genreIndex,1);
    this.setState({genres: genreState});

  }

	playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  stop = () => {
    this.setState({ url: null, playing: false })
  }

  save = () => {
    sessionStorage.setItem('playlists', JSON.stringify(this.state.genres));
    alert("Your playlists have been saved");
  }

  load = () =>{
    const playlists = sessionStorage.getItem('playlists');
    if (playlists) {
      this.setState({ genres: JSON.parse(playlists)});
      return;
    }
    console.log("no playlist was found");
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  setPlaybackRate = e => {
    console.log(parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))

  }

  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onConfigSubmit = () => {
    let config
    try {
      config = JSON.parse(this.configInput.value)
    } catch (error) {
      config = {}
      console.error('Error setting config:', error)
    }
    this.setState(config)
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }



  render() {
    const {
      genres, currentGenre, url, playing, volume,
      played, loaded, duration, playbackRate,
    } = this.state

    return (
      <div id="app">
     	  <ReactPlayer url={url} playing={playing} volume={volume} onEnded={this.nextSong} onError={e => console.log('onError', e)} onDuration={duration => this.setState({ duration })}  />
        <button className='out-btn' onClick={this.stop}>Stop</button>
        <button className='out-btn'  onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
        <button className='out-btn' onClick={this.load}>Load</button>
        <button className='out-btn' onClick={this.save}>Save</button>

        <div id="volume                                                                                 ">
          <h4>Volume</h4>
          <div>
            <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
          </div>
        </div>

        <div id="genreDetail">
          <h3>Current Tracks</h3>
          <GenreDetail genre={this.state.currentGenre} deleteTrack={this.deleteTrack} />
        </div>

        <div id="genreList">
          <h3>Genres</h3>
          <GenreList onGenreSelect={currentGenre => this.setState({currentGenre:currentGenre, url: _.sample(currentGenre.tracks), playing:true})}
            addGenre={this.addGenre} addTrack={this.addTrack} genres={this.state.genres} deleteGenre={this.deleteGenre} nextSong={this.nextSong} />
        </div>

        
      </div>
    );
  }
}
