const apiKey = "bee2b3b8d9976a2be3aae8b77feecf89";
const baseUrl = `https://api.themoviedb.org/3`;

function fetchMovies(url) {
  const URL = url;

  return fetch(URL)
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      return results;
    });
}
function fetchTrendingMovies(page) {
  const trendingMovieUrl = `${baseUrl}/trending/movie/day?api_key=${apiKey}&language=en-US&page=${page}`;
  return fetchMovies(trendingMovieUrl);
}
function fetchMoviesByQuery(query, page = 1) {
  const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
  return fetchMovies(searchUrl);
}
function fetchDetailsOfMovie(movie_id) {
  const detailsOfMovieUrl = `${baseUrl}/movie/${movie_id}?api_key=${apiKey}`;
  return fetchMovies(detailsOfMovieUrl);
}
function fetchCastOfMovie(movie_id) {
  const castUrl = `${baseUrl}/movie/${movie_id}/credits?api_key=${apiKey}&language=en-US`;
  return fetchMovies(castUrl);
}
function fetchReviewsOfMovie(movie_id, page = 1) {
  const reviewsUrl = `${baseUrl}/movie/${movie_id}/reviews?api_key=${apiKey}&language=en-US&page=${page}`;
  return fetchMovies(reviewsUrl);
}

export {
  fetchTrendingMovies,
  fetchMoviesByQuery,
  fetchDetailsOfMovie,
  fetchCastOfMovie,
  fetchReviewsOfMovie,
};
