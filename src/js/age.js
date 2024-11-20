document.addEventListener('DOMContentLoaded', function() {
    const unixTimestamp = 1206702900;
    const timestampDate = new Date(unixTimestamp * 1000);
    const now = new Date();
    const diffTime = Math.abs(now - timestampDate);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    let relativeTime = '';
    if (diffYears > 0) {
        relativeTime += `${diffYears}`;
    }
    relativeTime += ' y.o';
    document.getElementById('about-me').textContent = "Oleg • He/Him • " + relativeTime.trim();
});
