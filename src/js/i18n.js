document.addEventListener('DOMContentLoaded', () => {
    const supportedLanguages = ['en', 'ru'];
    const browserLanguage = navigator.language || navigator.languages[0];
    let defaultLanguage = browserLanguage.split('-')[0];

    if (!supportedLanguages.includes(defaultLanguage)) {
        defaultLanguage = 'en';
    }

    Promise.all([
        fetch('/src/locales/ru.json').then(response => response.json()),
        fetch('/src/locales/en.json').then(response => response.json())
    ])
        .then(([ru, en]) => {
            i18next.init({
                lng: defaultLanguage,
                debug: false,
                resources: {
                    ru: { translation: ru },
                    en: { translation: en },
                },
                detection: {
                    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
                    caches: ['localStorage', 'cookie'],
                },
            }, (err, t) => {
                if (err) {
                    console.error('Ошибка инициализации i18next:', err);
                    return;
                }
                updateContent();

                document.getElementById('ru-flag').addEventListener('click', () => { changeLanguage('ru');});
                document.getElementById('en-flag').addEventListener('click', () => {changeLanguage('en');});
            });
        })
        .catch(error => console.error('Ошибка загрузки переводов:', error));
});


function changeLanguage(language) {
    i18next.changeLanguage(language, (err) => {
        if (err) {
            console.error('Ошибка смены языка:', err);
            return;
        }
        updateContent();
    });
}


function updateContent() {
    const elements = {
        description: 'description',
        about: 'about',
        'about-me': 'about-me',
        py_lvl: 'middle',
        js_lvl: 'basic',
        html_lvl: 'basic',
        css_lvl: 'basic',
        interests: 'interests',
        music: 'music',
        'music-description': 'music-description',
        'favorite-track': 'favorite-track',
        'favorite-musician': 'favorite-musician',
        'minutes-with-music': 'minutes-with-music',
        'favorite-genre': 'favorite-genre',
        'pop-punk': 'pop-punk',
        'my-projects': 'my-projects',
        'senko-description': 'senko-description',
        'bots.SDC.C-description': 'bots.SDC.C-description',
        'weatherapp-description': 'weatherapp-description',
    };

    for (const [id, key] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = i18next.t(key);
        }
    }
}
