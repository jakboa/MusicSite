import './App.css';

import { useState } from 'react';

import SearchBar from './states/SearchBar';
import Playlist from './states/Playlist';
import Tracklist from './states/Tracklist';


import {SearchSong,getUser, createNewPlaylist} from './states/SpotifyAPI';
import MockData from './MockData';



function App() {

  // UseStates
  const [foundSongs, setFoundSongs] = useState(MockData);
  const [personStat, setPersonStat] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [playListName, setPlayListName] = useState("");
  
  const [playListTracks, setplayListTracks] = useState([]);


  
  // FUNCTIONS

  // Searchbar stuff
  const onChangeSearchbar = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchTracks = async() => {
    if (searchQuery) {
      const songs = await(SearchSong(searchQuery));
      if (songs)
        setFoundSongs(songs);
    }
  };
  
  // TEST STUFF
  const setPlayerInfo = async() => {

    const stats = await(getUser());
    if (stats)
      setPersonStat(stats);
    
  };



  // Playlist Stuff
  const onChangePlayListName = (event) => {
    setPlayListName(event.target.value);
  };

  const onChangeAddSong = (index) => {
    const songToMove = foundSongs[index];
    setplayListTracks((playSongs) => [...playSongs,songToMove]); 
    setFoundSongs((prevSongs) => prevSongs.filter((_, i) => i !==index ));
  };

  const onChangeRemoveSong = (index) => {
    const songToMove = playListTracks[index];
    setFoundSongs((playSongs) => [...playSongs,songToMove]); 
    setplayListTracks((prevSongs) => prevSongs.filter((_, i) => i !==index ));
  };

  const onChangeSavePlaylist = async () => {
    if (playListName.length == 0 || playListTracks.length === 0) {
      return
    };
    const newPlaylist = playListTracks;
    setsavedPlaylistTracks(newPlaylist);
    setplayListTracks([]);
    createNewPlaylist( await getUser(),playListName,newPlaylist);
  };


  return (
    <div className="App">

      <SearchBar queryName={searchQuery} onChangeQuery={onChangeSearchbar} />
      <button onClick={searchTracks}>SEARCH BUTTON</button>
      <Tracklist displaySongs={foundSongs}  addSong={onChangeAddSong} playlistSongs={playListTracks}/>
      <Playlist playName={playListName} onChangePlay={onChangePlayListName} displaySongs={playListTracks} removeSong={onChangeRemoveSong} />
      <button onClick={onChangeSavePlaylist}>SAVE BUTTON</button>
      <p>Saved Playlist Tracks: PLACEHOLDER!! </p>







      <button onClick={setPlayerInfo}>UpdateInfo About you!</button>
      <h1>Display your Spotify profile data</h1>

      <section id="profile">
      <h2>Logged in as <span id="displayName">{ !personStat || personStat.length === 0 ? ("Not set"):(personStat.displayName) } </span></h2>
      <span id="avatar"></span>
      <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
      </ul>
      </section>
    </div>
  );
}

export default App;
