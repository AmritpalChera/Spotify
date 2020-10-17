import React from 'react';
import "./SidebarOption.css";
import { useDataLayerValue } from "./DataLayer";
import { useEffect } from 'react';

const SidebarOption = (props) => {
    let { title, Icon, id } = props;
    const [{ playlists, spotify }, dispatch] = useDataLayerValue();
    useEffect(() => {
        if (playlists?.items) {
            console.log("IDD>>", playlists.items[0].id)
            spotify.getPlaylist(playlists.items[0].id).then((response) => {
                //gets a specific playlist to open its songs
                dispatch(({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: response,
                }))
            })
        }
       
    }, [playlists]);

    const handleClick = () => {
        if (playlists?.items) {
            console.log("CLICK IDD>>",id)
            spotify.getPlaylist(id).then((response) => {
                //gets a specific playlist to open its songs
                dispatch(({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: response,
                }))
            })
        }
    }
    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption-icon"/>}
            {Icon ? <h4>{title}</h4> :<p onClick={handleClick}>{title}</p>}
        </div>
    )
}

export default SidebarOption
