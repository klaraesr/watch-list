import React, {Component} from 'react'
import Navbar from "../Components/Navbar/Navbar"
import MovieList from "../Components/MovieList/MovieList"
import model from './../Model.js'
import MovieListFooter from "../Components/MovieListFooter/MovieListFooter";
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w780/'
const REPLACEMENT_IMG_SMALL = 'https://i.imgur.com/v8ND5Ui.png'

class MovieListPage extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            offset: 0,
            movieList: [],
            noMoreEntries: false,
            inToWatchList: {},
            inWatchedList: {}
        }

    }

    componentDidMount() {
        this.loadContent(this.state.offset)
    }

    loadContent = (offset) => {
        let idType = null
        if(this.props.listType === 'To Watch List'){ // What list to get movies from
            idType = 'watchlist_id'
        } else {
            idType = 'watchedlist_id'
        }
        model.getMoviesFromList(idType, offset, 10)
            .then(data => {
                console.log(data)
                if(data.movies.length < 10){
                    this.setState({noMoreEntries: true})
                }
                if(data.movies.length !== 0){
                    data.movies.forEach((movie) => {
                        let inWatchedList = false
                        let inToWatchList = false
                        if(movie.watchedlist_id !== null){inWatchedList = true}
                        if(movie.watchlist_id !== null){inToWatchList = true}

                        this.setState(prevState => ({inWatchedList: {...prevState.inWatchedList, [movie.id]: inWatchedList}}))
                        this.setState(prevState => ({inToWatchList: {...prevState.inToWatchList, [movie.id]: inToWatchList}}))
                    })
                    console.log(this.state.inToWatchList)
                    console.log(this.state.inWatchedList)
                    this.setState({
                        loading: false,
                        offset: offset + 10,
                        movieList: this.state.movieList.concat(data.movies.map(movie => ({
                            id: movie.id,
                            movieId: movie.movie_id,
                            image: (movie.image !== null ? IMG_BASE_URL_SMALL + movie.image : REPLACEMENT_IMG_SMALL ),
                            imgPath: movie.image,
                            title: (movie.name.length < 18) ? movie.name : movie.name.slice(0, 15) + '...',
                            watchedlist_id: movie.watchedlist_id,
                            watchlist_id: movie.watchlist_id
                        })))
                    })
                }
            })
            .catch(e => console.log(e))
    }

    handleBtn = (movieId, id, list, title, image, action) => {
        if(action === 'add'){
            this.setState(prevState => ({[list]: {...prevState[list], [id]: true}}))
            //model.addMovieToWatchList(movieId, title, image).then(data => console.log(data))
        } else if(action === 'remove') {
            this.setState(prevState => ({[list]: {...prevState[list], [id]: false}}))
            //model.deleteMovieFromToWatchList(movieId).then(data => console.log(data))
        }
    }

    handleLoadMore = () => {
        this.loadContent(this.state.offset)
    }

    render() {
        return (
            <div className="container appContainer">
                <Navbar/>
                {!this.state.loading &&
                <div>
                    <MovieList movieList={this.state.movieList}
                               listType={this.props.listType}
                               handleBtn={this.handleBtn}
                               inWatchedList={this.state.inWatchedList}
                               inToWatchList={this.state.inToWatchList}/>

                    <MovieListFooter handleLoadMore={this.handleLoadMore}
                                     noMoreEntries={this.state.noMoreEntries}/>
                </div>}
            </div>
        );
    }
}

export default MovieListPage;
