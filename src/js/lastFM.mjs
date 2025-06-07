import dotenv from 'dotenv';

dotenv.config();

const username = process.env.USERNAME_LASTFM;
const apiKey = process.env.API_KEY_LASTFM;

export async function getTopTracks() {
    const topTrack = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${apiKey}&limit=1&format=json`

    try{
        const response = await fetch(topTrack);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const track = data.toptracks.track[0];

        return{
           'url': track.url,
           'name': track.name,
           'artist': track.artist.name
        }
    } catch(error) {
        console.error("Error when receiving data from Last.fm:", error);
    }
}

export async function getTopArtist() {
    const topArtist = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&limit=1&format=json`

    try{
        const response = await fetch(topArtist);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const artists = data.topartists.artist[0];

        return{
            'url': artists.url,
            'name': artists.name,
        }
    } catch(error) {
        console.error("Error when receiving data from Last.fm:", error);
    }
}

export async function getPlayCount() {
    const getInfoUser = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`

    try{
        const response = await fetch(getInfoUser);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.user.playcount
    } catch(error) {
        console.error("Error when receiving data from Last.fm:", error);
    }
}

async function getArtistTags(artistName) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await res.json();

        return data.toptags?.tag?.slice(0, 3).map(tag => tag.name.toLowerCase()) || [];
    } catch (error) {
        console.error("Error when receiving data from Last.fm:", error);
    }
}

export async function getTopGenres() {
    const topArtistsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&limit=5&format=json`;
    const allTags = {};

    try {
        const response = await fetch(topArtistsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const artistsArray = data?.topartists?.artist;

        for (const artist of artistsArray) {
            const tags = await getArtistTags(artist.name); // Используем artist.name
            tags.forEach(tag => {
                allTags[tag] = (allTags[tag] || 0) + 1;
            });
        }
    } catch (error) {
        console.error("Error when receiving data from Last.fm:", error);
    }

    return Object.entries(allTags).sort((a, b) => b[1] - a[1]);
}
