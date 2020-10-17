import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from 'react';
import "./Body.css";
import { useDataLayerValue } from './DataLayer';
import Header from './Header'
import SongRow from './SongRow';

const Body = ({ spotify }) => {
    const [{ discover_weekly }, dispatch] = useDataLayerValue();
    

    //function that plays the playlist given its id
    const playPlaylist = (id) => {     
        spotify.play({
            context_uri: `spotify:playlist:3xqWxN2XRsvZAUlkEFuGdu`//
        });

        setTimeout(function () { 
            spotify.getMyCurrentPlayingTrack().then(res => {
                dispatch({
                    type: "SET_ITEM",
                    item: res.item
                });
                dispatch({
                    type: 'SET_PLAYING',
                    playing: true
                });
            })
        }, 500);
    };

    //function that plays the songs in the playlist given its id
    const playSong = (id) => {    
        console.log("CALLED")
        spotify.play({
            uris: [`spotify:track:${id}`] //uris
        }).catch(err => {
            alert("Please run the premium spotify app on any device. Remember to press the play button to active the process");
        });
            
        setTimeout(
            function (){
                spotify.getMyCurrentPlayingTrack().then(res => {
                    console.log("PLAY SONG >>>", res);
                    dispatch({
                        type: "SET_ITEM",
                        item: res.item
                    });
                    dispatch({
                        type: 'SET_PLAYING',
                        playing: true
                    });
                }).catch(err => console.log(err))
            }, 500);
        
        
            

        
    };

    

    return (
        <div className="body">
            <Header spotify={spotify} />
            
            <div className="body-info">
                <img src={discover_weekly?.images[0]?.url} alt="" />
                <div className="body-info-text">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>

            </div>

            <div className="body-songs">
                    <div className="body-icons">
                    <PlayCircleFilledIcon className="body-shuffle" onClick={playPlaylist}/>
                        <FavoriteIcon fontSize="large"/>
                        <MoreHorizIcon />
                    </div>
                    {discover_weekly?.tracks.items.map(item =>
                        <SongRow playSong={playSong} key={item.track.name} track={item.track}/>)}
            </div>
        </div>
    )
}

export default Body
