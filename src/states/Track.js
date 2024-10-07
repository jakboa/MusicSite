import React from "react";
import style from './Track.module.css'


function Track( {songInfo} ){
    
    return(
        <div className={style.songInfo}>
            {songInfo.map((info, index) => (
                <p key={index}>{info}</p>
            )
        )}
        </div>
    );
}

export default Track;






