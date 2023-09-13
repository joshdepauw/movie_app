const global = {
    currentPage: window.location.pathname,
};


console.log(global.currentPage);

async function displayPopularMovies() {
    const { results } = await fetchApiData('movie/popular');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
          ? `<img
            src="https://image.tmdb.org/t/p/w500 ${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
        /> `
            :
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`

        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
    });
}

async function displayPopularTvShows() {
    const { results } = await fetchApiData('tv/popular');

    results.forEach((show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
          ? `<img
            src="https://image.tmdb.org/t/p/w500 ${show.poster_path}"
            class="card-img-top"
            alt="${show.title}"
        /> `
            :
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.title}"
          />`

        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.release_date}</small>
          </p>
        </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
    });
}

// fetch data from api
async function fetchApiData(endpoint) {
    const API_KEY = '575e61f89185cc0e46b0856582006a14';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    
    const data = await response.json();

    return data;

}


// highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// initialize app
function init() {
    switch (global.currentPage) {
        case 'file:///C:/Users/JoshDePauw/Desktop/flixx-app/':
        case '/index.html':
            displayPopularMovies();
            break;
        case 'file:///C:/Users/JoshDePauw/Desktop/flixx-app/shows.html':
            console.log("Shows");    
            break
        case '/movies-details.html':
            console.log("Movie Details");    
            break
        case '/tv-details.html':
            console.log("Tv Details");    
            break
        case '/search.html':
            console.log("Search");    
            break
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);