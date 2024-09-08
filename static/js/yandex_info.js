const apiUrl = 'https://api.statusbadges.me/presence/679987861021655094';
const statusBlock = document.getElementById('yandex');
const statusText = statusBlock.querySelector('.info');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const yandexMusic = data.activities.find(activity => activity.name === 'Yandex Music');

    if (yandexMusic) {
        statusText.textContent = `${yandexMusic.details} - ${yandexMusic.state}`;
        statusBlock.style.display = 'inline-block';
    } else {
        statusText.textContent = 'nothing rn';
        statusBlock.style.display = 'inline-block';
    }
    })
     .catch(error => {
           statusText.textContent = 'Error loading status';
           statusBlock.style.display = 'inline-block';
     });
