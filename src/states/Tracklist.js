import React from "react";
import Track from "./Track";
import styles from "./Tracklist.module.css"


function Tracklist({displaySongs, addSong, playlistSongs}){
    return (
        <div className={styles.trackList}>
            <h3>This isTrackLIST!</h3>
            { !displaySongs || displaySongs.length === 0 ? (
                <p>No SONGS!</p>
             ) : ( displaySongs.map((song,index) => {
                    const songInList = playlistSongs.some(track => track.id === song.id);
                    return !songInList && (
                        <div>
                        <Track key={index} songInfo={song} />
                        <button style={{margin:"5px"}} onClick={() => addSong(index)}>ADD SONG</button>
                    </div>
                    ); 
                })
            )}
        </div>
    );
}


export default Tracklist;

