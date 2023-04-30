const global = {
  currentPage: window.location.pathname,
};

// popular movies
async function displayPopularMovie() {
  const { results } = await FetchAPIData("movie/popular");
  console.log(results);
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `  <a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />`
        : `<img
          src="images/no-image.jpg"
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
    </div>`;
    document.getElementById("popular-movies").appendChild(div);
  });
}

// function to display popular tv show
async function displayPopularTVShows() {
  const { results } = await FetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${show.first_air_date}</small>
    </p>
  </div>`;

    document.getElementById("popular-shows").appendChild(div);
  });
}

// function to display movie details

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await FetchAPIData(`movie/${movieId}`);
  console.log(movie);
  displayBackgroundImage("movie", movie.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
  ${
    movie.poster_path
      ? `<img
      src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
      alt="details.title"
      class="card-img-top"
      />`
      : `<img
      src="images/no-image.jpg"
      alt="details.title"
      class="card-img-top"
      />`
  }
  </div>
  <div class="back">
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star"></i>
      ${Math.round(movie.vote_average)}/10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
     ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul>
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Homepage</a>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span>Budget: </span> $${movie.budget}</li>
      <li><span>Revenue:</span>$${movie.revenue}</li>
      <li><span>Runtime: </span>${movie.runtime} minutes</li>
      <li><span>Status: </span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map(
      (company) => `${company.name}`
    )}</div>
  </div>`;
  document.querySelector("#movie-details").appendChild(div);
}

// function for show details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await FetchAPIData(`tv/${showId}`);
  console.log(show);
  displayBackgroundImage("tv", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
  ${
    show.poster_path
      ? ` <img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    alt="${show.name}"
    class="card-img-top"
  />`
      : ` <img
  src="images/no-image.jpg"
  alt="${show.name}"
  class="card-img-top"
/>`
  }
  </div>
  <div class="back">
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star"></i>
      ${Math.round(show.vote_average)}/10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
    ${show.overview}
    </p>
    <h4>Genres</h4>
    <ul>
    ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit Homepage</a>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span>No. of Episodes : </span>${show.number_of_episodes}</li>
      <li><span>Last Eposide:</span>${show.last_air_date}</li>
      <li><span>Status: </span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${show.production_companies.map(
      (company) => `${company.name}`
    )}</div>
  </div>`;
  document.getElementById("show-details").appendChild(div);
}

//function for background image
function displayBackgroundImage(type, background) {
  const div = document.createElement("div");
  div.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${background})`;
  div.style.backgroundSize = "cover";
  div.style.backgroundPosition = "center";
  div.style.backgroundRepeat = "no-repeat";
  div.style.height = "100vh";
  div.style.width = "100vw";
  div.style.position = "absolute";
  div.style.top = "0";
  div.style.left = "0";
  div.style.zIndex = "-1";
  div.style.opacity = "0.2";
  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(div);
  } else {
    document.querySelector("#show-details").appendChild(div);
  }
}

// Fetch data from API
async function FetchAPIData(endpoint) {
  const API_URL = "https://api.themoviedb.org/3/";
  const API_KEY = "cd5544aa111a21a3ce52f6c5734672df";
  showspinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hidespinner();
  return data;
}

function HighlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage)
      link.classList.add("active");
  });
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("home");
      displayPopularMovie();
      break;
    case "/shows.html":
      console.log("shows");
      displayPopularTVShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      displayShowDetails();
      console.log("TV Show Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  HighlightActiveLink();
}

function showspinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hidespinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", init);
