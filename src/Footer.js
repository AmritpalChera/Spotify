import React, { useEffect } from 'react';
import "./Footer.css";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from '@material-ui/core';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import { useDataLayerValue } from './DataLayer';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const Footer = () => {
    const [{ item, playing, spotify }, dispatch] = useDataLayerValue();
    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then(res => {
            console.log("FOOTER-CURRENT_PLAYBACK_STATE>>", res);
            dispatch({
                type: "SET_PLAYING",
                playing: res.is_playing
            });
            dispatch({
                type: "SET_ITEM",
                item: res.item
            });

        })
    }, [spotify]);


    const handlePlayPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false
            });
        }
        else {
            spotify.play().catch(err => console.log(err));
            dispatch({
                type: "SET_PLAYING",
                playing: true
            });
        }
        
    };

    const skipNext = () => {
        spotify.skipToNext().then((r)=>console.log(r))
        setTimeout(function () {
            spotify.getMyCurrentPlayingTrack().then((res) => {
                dispatch({
                    type: "SET_ITEM",
                    item: res.item
                })
    
                dispatch({
                    type: "SET_PLAYING",
                    playing: true
                })
            })
        }, 500)
        
    };

    const skipPrevious = () => {
        spotify.skipToPrevious();
        setTimeout(function () {
            spotify.getMyCurrentPlayingTrack().then((res) => {
                dispatch({
                    type: "SET_ITEM",
                    item: res.item
                })
    
                dispatch({
                    type: "SET_PLAYING",
                    playing: true
                })
            })
        }, 500)

        
    }

    return (
        <div className="footer">
            <div className="footer-left">
                <img className="footer-albumLogo"
                    src={item?.album.images[0].url} alt={item?.name}>    
                </img>
                
                {/* {console.log("ITEMM 👾 ", (item? item: "no item"))}; */}
                    
                {item ?
                    (<div className="footer-songInfo">
                        {/* {console.log("ITEM-FOOTER>> ", item)} */}
                        <h4>{item.name}</h4>
                        <p>{item.artists.map(artist => artist.name).join(", ")}</p>
                    </div>
                    ) : (
                        <div className="footer-songInfo">
                            <h4>No song is playing</h4>
                            <p>...</p>
                        </div>
                    )}
            </div>

            <div className="footer-center">
                <ShuffleIcon className="footer-green"/>
                <SkipPreviousIcon onClick={skipPrevious} className="footer-icon" />
                {
                    playing ? (<PauseCircleOutlineIcon fontSize="large" className="footer-icon" onClick={handlePlayPause} />) :
                        (<PlayCircleOutlineIcon fontSize="large" className="footer-icon" onClick={handlePlayPause}/>)
                }
                
                <SkipNextIcon className="footer-icon" onClick={skipNext} />
                <RepeatIcon className="footer-green"/>
            </div>

            <div className="footer-right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon />
                    </Grid>
                    
                    <Grid item>
                        <VolumeDownIcon />
                    </Grid>
                    <Grid item xs>
                        <Slider />
                    </Grid>
                </Grid>
            </div>
             
            
        </div>
    )
}

export default Footer;
