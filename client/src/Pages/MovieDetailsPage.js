import React, {Component} from 'react'
import MovieDetails from "../Components/MovieDetails/MovieDetails";
import Loader from "react-loader-spinner";
const IMG_BASE_URL_LARGE = 'http://image.tmdb.org/t/p/w780'

// statefull component
class MovieDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            inWatchedList: null,
            inToWatchList: null,
        }
    }

    componentDidMount() {
        this.getMovie(this.props.params.id)
        //Set inWatchList and inToWatchList by checking with database
    }

    handleSetWatched = () => {
        console.log("Toggle in watched-list in database")
    }

    handleSetToWatch = () => {
        console.log("Toggle in to watch-list in database")
    }

    getMovie = (movieId) => {
        this.props.model.getMovie(movieId)
            .then(data => {
                this.setState({
                    loading: false,
                    movie: {
                        id: data.id,
                        title: data.title,
                        description: data.overview,
                        budget: data.budget,
                        revenue: data.revenue,
                        status: data.status,
                        runtime: data.runtime,
                        voteCount: data.vote_count,
                        voteAverage: data.vote_average,
                        poster: IMG_BASE_URL_LARGE + data.poster_path,
                        IMDBId: data.imdb_id
                    }
                })
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
                {this.state.loading && <div className="loader"><Loader type="Oval" color="#FF9A00" height="100" width="100"/></div>}
                {!this.state.loading && <MovieDetails movie={this.state.movie} inWatchedList={false} inToWatchList={true} handleSetWatched={this.handleSetWatched} handleSetToWatch={this.handleSetToWatch} loading={this.state.loading}/>}
            </div>
        );
    }
}


//const mock = {"id":297802,"title":"Aquaman","description":"Once home to the most advanced civilization on Earth, Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people and then the surface world. Standing in his way is Arthur Curry, Orm's half-human, half-Atlantean brother and true heir to the throne.","budget":160000000,"revenue":1143689193,"status":"Released","runtime":144,"tagline":"Home Is Calling","voteCount":4546,"voteAverage":6.8,"poster":"http://image.tmdb.org/t/p/original//5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg","IMDBId":"tt1477834"}
export default MovieDetailsPage;
