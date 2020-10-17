import React from 'react';
import { useDataLayerValue } from './DataLayer';
import './SongRow.css'

const SongRow = ({ track, playSong }) => {

    const [{}, dispatch] = useDataLayerValue()
    const handleClick = () => {
        playSong(track.id);
        

    }

    return (
        <div className="songRow" onClick={handleClick}>
            <img className = "songRow-album" src={track.album.images[0].url} alt="" />
            <div className="songRow-info">
                <h1>{track.name}</h1>
                <p>
                    {track.artists.map((artist) => (artist.name)).join(", ")}
                    {track.album.name}
                </p>
            </div>
            
        </div>
    )
}

export default SongRow
