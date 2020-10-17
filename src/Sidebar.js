import "./Sidebar.css";
import SidebarOption from './SidebarOption'
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { useDataLayerValue } from "./DataLayer";
import { useEffect } from "react";

const Sidebar = () => {
    const [{ playlists, spotify }, dispatch] = useDataLayerValue();
    //console.log(playlists);

   
    return (
        <div className="sidebar">
            <img
                className = "sidebar-logo"
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="">
            </img>

            <SidebarOption title="Home" Icon={HomeIcon}/>
            <SidebarOption title="Search" Icon={SearchIcon}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />

            <br/>
            <strong className="sidebar-title">PLAYLISTS</strong>
            <hr />
            {playlists?.items?.map(playlist => {
               // console.log("PLAYLIST INFO >> ", playlist);
                return <SidebarOption key={playlist.name} title={playlist.name} id={playlist.id} />
            })}

            {/* <SidebarOption title="Hip Hop"/>
            <SidebarOption title="Pop"/>
            <SidebarOption title="RnB"/> */}

        </div>
    )
}

export default Sidebar
