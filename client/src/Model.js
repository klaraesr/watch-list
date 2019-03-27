import { Component } from 'react'
const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.REACT_APP_API_KEY
const HEADER =  {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }}

class DinnerModel extends Component {

    // Returns info about a movie with id movieId
    getMovie(movieId) {
        const URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        return fetch(URL).then(this.processResponse)
    }

    // Returns 20 movies in theatre now
    getMoviesInTheatre() {
        const URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`;
        return fetch(URL).then(this.processResponse);
    }

    // Returns 20 movies based upon a movie id (hårdkodat for now)
    getRecommendedMovies() {
        const MOVIE = '399579' // get latest movie added to list from database
        const URL = `${BASE_URL}/movie/${MOVIE}/recommendations?api_key=${API_KEY}&language=en-US`;
        return fetch(URL).then(this.processResponse);
    }

    addToList(toWatch, movieId, title, image) {
      let PATH = ''
      if(toWatch) {
        PATH = '/api/addToWatch'
      } else {
        PATH = '/api/addWatched'
      }
      return fetch(PATH, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
          title,
          image
        })})
        .then(this.processResponse)
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }

    searchMoviesWithQueryString(keyword, pageNr) {
      const QUERY = keyword
      let PAGE = 1
      if(pageNr !== undefined) {
        PAGE = pageNr
      }
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY}&page=${PAGE}&include_adult=false`;
      console.log(url)
      return fetch(url).then(this.processResponse)
    }

    addMovieToList(movieId, list) {
      // TODO:
      console.log('addMovieToList (todo): ', movieId, list)
    }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
