document.addEventListener('DOMContentLoaded', () => {
    const startDisplay = document.getElementById('page');
    const skyDisplay = document.getElementById('skyEvents');
    const horoscopeDisplay = document.getElementById('horoscope');
    const moonDisplay = document.getElementById('moon');
    const skyEventButton = document.getElementById('skyButton');
    const horoscopeButton = document.getElementById('horoscopeButton');
    const moonButton = document.getElementById('moonButton');
    const homeButton = document.getElementById('startButton');
    const horoscopeResults = document.getElementById('results');

    homeButton.addEventListener('click', function() {
        console.log('Home button clicked.');
        startDisplay.className = 'container'; // Makes Home section visible.
        skyDisplay.className = 'hidden';
        horoscopeDisplay.className = 'hidden';
        moonDisplay.className = 'hidden';
    });
    skyEventButton.addEventListener('click', function() {
        console.log('Sky Events button clicked.');
        startDisplay.className = 'hidden';
        skyDisplay.className = 'container'; // Makes Sky Events section visible.
        horoscopeDisplay.className = 'hidden';
        moonDisplay.className = 'hidden';
    });
    horoscopeButton.addEventListener('click', function() {
        console.log('Horoscope button clicked.');
        startDisplay.className = 'hidden';
        skyDisplay.className = 'hidden';
        horoscopeDisplay.className = 'container'; // Makes Horoscope section visible.
        moonDisplay.className = 'hidden';
    });
    moonButton.addEventListener('click', function() {
        console.log('Moon Phase button clicked.');
        startDisplay.className = 'hidden';
        skyDisplay.className = 'hidden';
        horoscopeDisplay.className = 'hidden';
        moonDisplay.className = 'container'; // Makes Moon Phase section visible.
    });

    // Adds data to the Sky Events section on the website.
    async function getAllEvents() {
        try {
            const response = await fetch('https://api.cosmyday.com/events/upcoming?days=60&min_importance=60');
            const data = await response.json();
            console.log(data);

            data.events.forEach(event => {
            skyDisplay.innerHTML += `<div class="separate"><h3>${event.headline}</h3>
            <p>Starting on: ${event.date}<br>${event.long}</p></div>`;
            });
        } catch (error) {
            console.log(error);
        }
    }
    getAllEvents();

    // Uses value from dropdown menu to select a horoscope; passes value through the getHoroscope method. Adds data to the Horoscope section on the website.
    const signs = document.querySelector('select');
    signs.addEventListener('change', () => {
        if(signs.value) {
            console.log('Selected a birthdate:', signs.value);
            getHoroscope(signs.value);
        } else {
            horoscopeResults.innerHTML = ""; // Returns to blank.
            console.log('Selected the default value in dropdown menu.');
        }
    });
    async function getHoroscope(hsc) {
        try {
            const response = await fetch('https://api.cosmyday.com/content/daily/' + hsc + '/');
            const data = await response.json();
            console.log(data);

            horoscopeResults.innerHTML = `<p align="center">You are a(n) ${hsc}!<br><br>
            <img src="img/${hsc}.png" alt="Decorative image of the horoscope."></p>
            <pre>${data.content}</pre><p>${data.closing}</p>`;
        } catch (error) {
            console.log(error);
        }
    }

    // Adds data to the Moon Phase section on the website.
    async function getMoonPhase() {
        try {
            const response = await fetch('https://api.cosmyday.com/content/moon');
            const data = await response.json();
            console.log(data);

            moonDisplay.innerHTML += `<p>${data.moon.phase_name} • ${data.moon.illumination}% 
            Illumination • ${data.moon.sign} in ${data.moon.degree}°</p><p>${data.content}</p>`;
        } catch (error) {
            console.log(error);
            moonDisplay.innerHTML = "";
        }
    }
    getMoonPhase();
});