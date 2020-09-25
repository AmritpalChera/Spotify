import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    //only update token if we have a hash object
    if (hash) {
      //console.log("I HAVE A TOKEN >>>>", hash.access_token);
      setToken(hash.access_token);
    } 
  }, [])

  return (
    <div className="app">
      {
        token? ("Logged in") : (<Login/>)
      }
    </div>
  );
}

export default App;
