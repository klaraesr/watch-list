import React, {Component} from 'react'
import ObservableModel from "./ObservableModel";
import * as config from "./config";
const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.REACT_APP_API_KEY
const HEADER =  {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  }}

class DinnerModel extends ObservableModel {
    constructor(props) {
        super(props);
    }

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

    // Returns 20 movies based upon a movie id (hårdkodat for now)
    getRecommendedMovies() {
        return fetch('api/getLatestAddedMovie', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.getCurrentUser()
            })
        })
            .then(res => res.json())
            .then(data => {
                if(data.movieId !== null) {
                    const MOVIE = data.movieId
                    const URL = `${BASE_URL}/movie/${MOVIE}/recommendations?api_key=${API_KEY}&language=en-US`
                    return fetch(URL).then(this.processResponse)
                } else {
                    console.log("model got null")
                    return null
                }
            })
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
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
