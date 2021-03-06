import ObservableModel from "./ObservableModel";
import * as config from "./config";
const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.REACT_APP_API_KEY
const JSON_HEADERS =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

class Model extends ObservableModel {

    setCurrentUser(value) {
        if(value === null){
            localStorage.removeItem('currentUser')
        } else {
            localStorage.setItem('currentUser', value);
        }
        this.notifyObserver()
    }

    getCurrentUser() {
        return localStorage.getItem('currentUser')
    }

    // Returns info about a movie with id movieId
    getMovie(movieId) {
        const URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        return fetch(URL).then(this.processResponse)
    }

    // Returns 20 movies in theatre now
    getMoviesInTheatre() {
        const URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
        return fetch(URL).then(this.processResponse)
    }

    // Gets the 5 latest movies from each list
    getLatestAddedToLists() {
        const URL = 'api/getLatestMoviesFromList/' + this.getCurrentUser()
        return fetch(URL).then(this.processResponse)
    }

    // Hämta filmer från lista med limit och offset och userId (från get current user)
    getMoviesFromList(list, offset, limit) {
        const URL = '/api/getMoviesFromList/' + this.getCurrentUser() + '/' + list + '/' + offset + '/' + limit
        return fetch(URL).then(this.processResponse)
    }

    // Returns 20 movies based upon a the latest movie added to the current user's watched-list
    getRecommendedMovies() {
        const URL = 'api/getLatestAddedMovie/' + this.getCurrentUser()
        return fetch(URL)
            .then(res => res.json())
            .then(data => {
                if(data.movieId !== null) {
                    const MOVIE = data.movieId
                    const URL = `${BASE_URL}/movie/${MOVIE}/recommendations?api_key=${API_KEY}&language=en-US`
                    return fetch(URL).then(this.processResponse)
                } else {
                    return null
                }
            })
    }

    // Check if movie with id is in lists, returns a json-object with inWatchlist: false/true and inToWatchList: false/true
    checkMovieInLists(movieId) {
        const URL = '/api/checkMovieInLists/' + movieId + '/' + this.getCurrentUser()
        return fetch(URL).then(this.processResponse)
    }

    // Get the username, image, numberofwatched and numberoftowatch from user
    getUser() {
        const URL = 'api/getUser/' + this.getCurrentUser()
        return fetch(URL).then(this.processResponse)
    }

    // Validate user
    validateUser(username, password) {
        return fetch('/api/validateuser', {
            method: 'POST',
            headers: JSON_HEADERS,
            body: JSON.stringify({
                username,
                password
            })
        }).then(this.processResponse)
    }

    // Create a user to the database
    createUser(username, password, link, deletehash) {
        return fetch('/api/createuser', {
            method: 'POST',
            headers: JSON_HEADERS,
            body: JSON.stringify({
                username,
                password,
                link,
                deletehash
            })
        }).then(this.processResponse)
    }

    // Uploads an image to the Imgur-API, returns the link and the deletehash
    // the deletehash is for if we want to delete the image from imgur.
    // You do this with https://api.imgur.com/3/image/{id}, where {id} is the deletehash.
    uploadImage(selectedFile) {
        return fetch('https://api.imgur.com/3/image/', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${config.client}`
            },
            body: selectedFile
        }).then(this.processResponse)
    }

    addMovieToWatchList(movieId, movieTitle, moviePoster) {
      const path = '/api/addToWatch'
      return this.addMovieToList(path, movieId, movieTitle, moviePoster)
        .then(this.processResponse)
    }

    addMovieToWatchedList(movieId, movieTitle, moviePoster) {
      const path = '/api/addWatched'
      return this.addMovieToList(path, movieId, movieTitle, moviePoster)
        .then(this.processResponse)
    }

    addMovieToList(path, movieId, movieTitle, moviePoster) {
      const userId = this.getCurrentUser()
      return fetch(path, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
          userId,
          movieId,
          movieTitle,
          moviePoster
        })
      })
    }

    deleteMovieFromToWatchList(movieId) {
      const path = '/api/deleteFromToWatch'
      return this.deleteMovieFromList(path, movieId)
        .then(this.processResponse)
    }

    deleteMovieFromWatchedList(movieId) {
      const path = '/api/deleteFromWatched'
      return this.deleteMovieFromList(path, movieId)
        .then(this.processResponse)
    }

    deleteMovieFromList(path, movieId) {
      const userId = this.getCurrentUser()
      return fetch(path, {
          method: 'POST',
          headers: JSON_HEADERS,
          body: JSON.stringify({
            userId,
            movieId
          })
      })
    }

    searchMoviesWithQueryString(keyword, pageNr) {
      const QUERY = keyword
      let PAGE = 1
      if(pageNr !== undefined) {
        PAGE = pageNr
      }
      const URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${QUERY}&page=${PAGE}&include_adult=false`;
      return fetch(URL).then(this.processResponse)
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
}

// Export an instance of DinnerModel
const modelInstance = new Model();
export default modelInstance;
