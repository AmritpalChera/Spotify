//Web-playback-sdk documentation
//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "8a104a967a884c95916584319c68b1f9";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    if (!window.location.hash) return;
    let toReturn = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            // console.log("🔺 Initial", initial);
            // console.log("🔺 Item", item);
            let parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial;
        }, {});
    
    // console.log(toReturn);
    return toReturn;
}

// "%20" is the ascii for space so join scopes by a space
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;



