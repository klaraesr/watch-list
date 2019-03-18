import React, { Component } from 'react'
const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.REACT_APP_API_KEY

class DinnerModel extends Component {

    // Gets 20 movies in theatre now
    getMoviesInTheatre() {
        const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`;
        return fetch(url).then(this.processResponse);
    }

    getRecommendedMovies() {
        const MOVIE = '399579' // get latest movie added to list from database
        const url = `${BASE_URL}/movie/${MOVIE}/recommendations?api_key=${API_KEY}&language=en-US`;
        return fetch(url).then(this.processResponse);
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;