import React, {Component} from 'react'
import MovieDetails from "../../Components/MovieDetails/MovieDetails";
const IMG_BASE_URL = 'http://image.tmdb.org/t/p/original/'

// statefull component
class MovieDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            movie: null
        }
    }

    componentDidMount() {
        //this.getMovie(this.props.params.id)
    }

    getMovie(movieId) {
        this.props.model.getMovie(movieId)
            .then(data => {
                this.setState({
                    movie: {
                        id: data.id,
                        title: data.original_title,
                        description: data.overview,
                        budget: data.budget,
                        revenue: data.revenue,
                        status: data.status,
                        runtime: data.runtime,
                        tagline: data.tagline,
                        voteCount: data.vote_count,
                        voteAverage: data.vote_average,
                        poster: IMG_BASE_URL + data.poster_path,
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
                <MovieDetails movie={mock}/>
            </div>
        );
    }
}

const mock = {"id":297802,"title":"Aquaman","description":"Once home to the most advanced civilization on Earth, Atlantis is now an underwater kingdom ruled by the power-hungry King Orm. With a vast army at his disposal, Orm plans to conquer the remaining oceanic people and then the surface world. Standing in his way is Arthur Curry, Orm's half-human, half-Atlantean brother and true heir to the throne.","budget":160000000,"revenue":1143689193,"status":"Released","runtime":144,"tagline":"Home Is Calling","voteCount":4546,"voteAverage":6.8,"poster":"http://image.tmdb.org/t/p/original//5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg","IMDBId":"tt1477834"}
export default MovieDetailsPage;
