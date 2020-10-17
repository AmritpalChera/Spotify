import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotiWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotiWebApi();

function App() {

  //const [token, setToken] = useState(null);


  //dispatch is like a gun to shoot the data to the datalayer
  //you can use the first object to get anything from the dataLayer {user, token, ...}
  const [{user, token, playlists}, dispatch] = useDataLayerValue(); // {user} = dataLayer.user

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash ? hash.access_token : null;

    //only update token if we have a hash object
    if (_token) {
      
      //setToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      
      // shoot spotify functions to the context
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify
      })

      spotify.setAccessToken(_token); //sets the token for api

      //gets the current user information from spotify, if success, pops it into dataLayer
      spotify.getMe().then(user => {
        //sets the current user 
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      spotify.getUserPlaylists().then((playlists) => {
        //get the user playlists (listed in sidebar)
        console.log("PLAYLIST>> ", playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        })
      })

      
      

      spotify.getMyTopArtists().then(response => {
        //get the top artists 
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response
        })
      })

      
    } 

    //console.log("I HAVE A TOKEN >>>>", _token);
  }, [])

  // console.log("👦", user);
  // console.log('TOKEN >> ', token);

  return (
    <div className="app">
      {
        token ? (<Player spotify={spotify}/>) : (<Login/>)
      }
    </div>
  );
}

export default App;
