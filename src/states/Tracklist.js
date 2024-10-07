import React from "react";
import Track from "./Track";
import styles from "./Tracklist.module.css"


function Tracklist({displaySongs, addSong}){
    return (
        <div className={styles.trackList}>
            <h3>This isTrackLIST!</h3>
            {displaySongs.map((song,index) => (
                <div>
                    <Track key={index} songInfo={song} />
                    <button style={{margin:"5px"}} onClick={() => addSong(index)}>ADD SONG</button>
                </div>
                ))}
        </div>
    );
}


export default Tracklist;

