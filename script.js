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
      console.log("Movie Details");
      break;
    case "/tv-details.html":
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
