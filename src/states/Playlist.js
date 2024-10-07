import React from "react";
import Track from "./Track";
import styles from "./Playlist.module.css"


function Playlist( {playName, onChangePlay, displaySongs, removeSong } ){
    return(
        <div className={styles.playList}>
            <h4>Name of Playlist:</h4>
            <h3>{playName}</h3>
            <input type="text" value={playName} onChange={onChangePlay} ></input>
            {displaySongs.map((song,index) => (
                (
                    <div>    
                        <Track key={index} songInfo={song} />
                        <button style={{ margin:"5px" }} onClick={()=> removeSong(index)}>Remove Song</button>
                    </div>
                    ))
                )
                }
        </div>
    );
}


export default Playlist;
