
import React, { useEffect, useState } from 'react';


/*
let sensitiveInformation;
let redirectUri;
let clientId;
let clientSecret;

async function replaceWithMock() {
    try {
        sensitiveInformation = await import("./SpotifyKeys"); // dynamic import
        
        redirectUri = sensitiveInformation.redirectUri;
        clientId = sensitiveInformation.clientId;
        clientSecret = sensitiveInformation.clientSecret;
      
    } catch (error) {
      console.error('Failed to load the module:', error);
    }
  }
  
  loadModule();
  */
/*
import sensitiveInformation from "./SpotifyKeys";
const redirectUri = sensitiveInformation.redirectUri;
const clientId = sensitiveInformation.clientId;
const clientSecret = sensitiveInformation.clientSecret;
*/

const redirectUri = "...";
const clientId = "...";
const clientSecret = "...";



const baseTokenUrl = 'https://accounts.spotify.com/api/token';

let accessTokenSong;

let accessToken;

let authorizeToken;

async function getSpotifyAccess() {
    const data = new URLSearchParams({
        grant_type:'client_credentials',
        client_id: `${clientId}`,
        client_secret:`${clientSecret}`
    })
    try {
        const response = await fetch(baseTokenUrl, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            accessTokenSong = jsonResponse.access_token;


            const expires = jsonResponse.expires_in;
            const tokenType = jsonResponse.token_type;
            //console.log("This is the access: "+accessTokenSong +"This is how many seconds i have:" +expires +"This is the token type" + tokenType);

        };
    } catch(error) {console.log(error)}
};


const SearchSong = async(query) => {
    const baseURLTrack = 'https://api.spotify.com/v1/search?q=track%3A';
    //const query = 'comedy';
    const endpoint3 = '&type=track';
    const URLCombines = `${baseURLTrack}${query}${endpoint3}`
    if (!accessTokenSong) {
        await getSpotifyAccess();
    };
    try {
        const response = await fetch(URLCombines, {
            headers:{
                'Authorization': `Bearer  ${accessTokenSong}`
            }
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            const foundSongs = [];
            const tracksResponse = jsonResponse.tracks.items;
            tracksResponse.forEach(trackInfo => {
                const artists = [];
                trackInfo.artists.forEach(artist => {
                    artists.push(artist.name);
                })
                foundSongs.push({name:trackInfo.name,
                                id:trackInfo.id,
                                artist:artists,
                                album:trackInfo.album.name,
                                uri:trackInfo.uri
                })
            });
            //console.log(foundSongs);
            //console.log(foundSongs[1]);
            return foundSongs;
        };
    } catch(error) {console.log(error)}

};














// THIS CODE WHERE I GET THE ACCESS TOKEN IS TAKEN FROM THE TUTORIAL HERE:
// https://developer.spotify.com/documentation/web-api/howtos/web-app-profile

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    authorizeToken = await getAccessToken(clientId, code);
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", "user-read-private playlist-modify-public");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });
    console.log(result);
    const { access_token } = await result.json();
    return access_token;
}


async function getUser() {
    const baseUrl = "https://api.spotify.com/v1/me";
    try {
        const response = await fetch(baseUrl, {
            headers:{
                'Authorization': `Bearer  ${authorizeToken}`
            }
            
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        const personInfo = {
            id:jsonResponse.id,
            displayName:jsonResponse.display_name,
            country:jsonResponse.country,
            uri:jsonResponse.uri
        };
        return personInfo;

        };

    } catch(error) {console.log(error)}
};





// CREATE PLAYLIST - THEN ADD SONGS


const createNewPlaylist = async(user,playListName,playListTracks) => {
    try {
    const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`,{
        method:'POST',
        headers : {
            'Content-Type':'application/json',
            'Authorization': `Bearer  ${authorizeToken}`
        },
        body : JSON.stringify({
            name: playListName,
            description: "New playlist description",
            public: true
        } )
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        const playlistId = jsonResponse.id; 
        console.log(response.status);

        const trackUris = [];
        playListTracks.forEach((track) => {
            const keys = Object.keys(track);
            if (keys.includes("uri")) {
                trackUris.push(`${track.uri}`);
            };
        });

        const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method :'POST',
            headers : {
                'Authorization': `Bearer  ${authorizeToken}`,
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                uris: trackUris
            })
        })
        console.log(tracksResponse.status);
        console.log(tracksResponse.message);
    };
    } catch (error) {console.log(error)};

};




export  {SearchSong, getUser, createNewPlaylist};
