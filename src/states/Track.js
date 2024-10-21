import React from "react";
import style from './Track.module.css'


function Track( {songInfo} ){

    return(
        <div className={style.songInfo}>
            
            <p>{songInfo.name}</p>
            <p>{songInfo.artist} {songInfo.album}</p>
            
        </div>
    );
}

export default Track;






