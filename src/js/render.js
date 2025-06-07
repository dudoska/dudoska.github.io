const apiUrl = 'https://api.statusbadges.me/presence/679987861021655094';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const status = document.getElementById('status');
        const statusCurrent = data.status;
        if (statusCurrent) {
            status.textContent = `Status: ${statusCurrent}`;
        }

        const statusListening = document.getElementById('listening');
        const yandexMusic = data.activities.find(activity => activity.name === 'Yandex Music');
        if (yandexMusic) {
            statusListening.textContent = `Listening: ${yandexMusic.details} - ${yandexMusic.state}`;
        }

        const statusAPP = document.getElementById('APP');
        const game = data.activities.find(activity => activity.type === 0);
        if (game) {
            statusAPP.textContent = `Playing: ${game.name}`;
        }
    })
    .catch(error => {
        statusText.textContent = 'Error loading status';
        console.error(error);
    });

document.addEventListener("DOMContentLoaded", async function() {
    const elements = {
        "favorite-track-data": { endpoint: '/api/get-top-track', format: data => `${data.name} - ${data.artist}`, useUrl: true },
        "favorite-artists-data": { endpoint: '/api/get-top-artists', format: data => `${data.name}`, useUrl: true },
        "play-count-data": { endpoint: '/api/get-play-count', format: data => `${data}` },
        "favorite-genre-data": { endpoint: '/api/get-top-genres', format: data => `${data[0][0]}` }
    };

    for (const [id, config] of Object.entries(elements)) {
        try {
            const response = await fetch(`${config.endpoint}?timestamp=${new Date().getTime()}`);
            const data = await response.json();

            const element = document.getElementById(id);
            element.textContent = config.format(data);

            if (config.useUrl && data.url) {
                element.href = data.url;
            }
        } catch (error) {
            console.error(`Ошибка при получении данных для ${id}:`, error);
        }
    }
});
