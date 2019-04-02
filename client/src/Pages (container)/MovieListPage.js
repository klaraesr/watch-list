import React, {Component} from 'react'
import Navbar from "../Components (presentational)/Navbar/Navbar"
import MovieList from "../Components (presentational)/MovieList/MovieList"
import model from './../Model.js'
import MovieListFooter from "../Components (presentational)/MovieListFooter/MovieListFooter";
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w780/'
const REPLACEMENT_IMG_SMALL = 'https://i.imgur.com/v8ND5Ui.png'

class MovieListPage extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            offset: 0,
            movieList: [],
            noMoreEntries: false
        }
    }

    componentDidMount() {
        this.loadContent(this.state.offset)
    }

    loadContent = (offset) => {
        let idType = null
        if(this.props.listType === 'To Watch List'){
            idType = 'watchlist_id'
        } else {
            idType = 'watchedlist_id'
        }
        model.getMoviesFromList(idType, offset, 10)
            .then(data => {
                if(data.movies.length < 10){
                    this.setState({noMoreEntries: true})
                }
                if(data.movies.length !== 0){
                    this.setState({
                        loading: false,
                        offset: offset + 10,
                        movieList: this.state.movieList.concat(data.movies.map(movie => ({
                            id: movie.id,
                            image: (movie.image !== null ? IMG_BASE_URL_SMALL + movie.image : REPLACEMENT_IMG_SMALL ),
                            title: (movie.name.length < 18) ? movie.name : movie.name.slice(0, 15) + '...',
                            watchedlist_id: movie.watchedlist_id,
                            watchlist_id: movie.watchlist_id
                        })))
                    })
                }
            })
            .catch(e => console.log(e))
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
                    <MovieList movieList={this.state.movieList} listType={this.props.listType}/>
                    <MovieListFooter handleLoadMore={this.handleLoadMore} noMoreEntries={this.state.noMoreEntries}/>
                </div>}
            </div>
        );
    }
}

export default MovieListPage;
