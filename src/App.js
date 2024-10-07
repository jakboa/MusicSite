import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

import SearchBar from './states/SearchBar';
import Playlist from './states/Playlist';
import Tracklist from './states/Tracklist';

import MockData from './MockData';

function App() {

  const [foundSongs, setFoundSongs] = useState(MockData);
  const [playListName, setplayListName] = useState("");
  const [playListTracks, setplayListTracks] = useState([]);

  const onChangePlayListName = (event) => {
    setplayListName(event.target.value);
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

  return (
    <div className="App">

      <SearchBar />
      <button>SEARCH BUTTON</button>
      <Tracklist displaySongs={foundSongs} addSong={onChangeAddSong}/>
      <Playlist playName={playListName} onChangePlay={onChangePlayListName} displaySongs={playListTracks} removeSong={onChangeRemoveSong} />
      <button>SAVE BUTTON</button>








      <h1>Display your Spotify profile data</h1>

      <section id="profile">
      <h2>Logged in as <span id="displayName"></span></h2>
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
