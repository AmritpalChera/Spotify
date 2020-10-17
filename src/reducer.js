export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    discover_weekly: null,
    playing: false,
    item: null,
    //remove token value after finished developing
    //token: "BQClVOoL3eS277bye0xkdLuo1GkZIBwQFMxbbewG_YXDZ1gXb3odoYYiKCiO77eSCorA83ixN1iSrZ4LxkrXjxYAHq0W3lF9gfySpT7Icyg94-LZL7j9Al378blnG7p2ZjWwy6C2MfNCRXBcrpfcX8cQlEIPAns",
    top_artists: null,
}



const reducer = (state, action) => {
    /**
     * state: how dataLayer currently looks
     * action: how we manipulate what the data layer looks like 
     *         (setting things): set the user, set the currently playing            
     */
    //console.log(action);

    //Action -> type, [payload]

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify
            }
        
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists
            }
        
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing
            }
        
        case "SET_ITEM":
            return {
                ...state,
                item: action.item
            }
        
        
        
        default:
            return state;
    }
};

export default reducer;