import React, {Component} from 'react'
import './MovieDetails.css'
import StarRatings from "react-star-ratings";

// Image, Title, IMDB-rating, Description in two columns
class MovieDetails extends Component {
    render() {
        const {poster, title, description, status, IMDBId, runtime, tagline, voteAverage, voteCount, budget, revenue} = this.props.movie
        return (
            <div id="movie-details-row" className="row no-gutters">
                <div className="col-xs-6 col-sm-6">
                    <div className="container">
                    <img className="poster" src={poster}/>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 right">
                    <div className="container" id="movie-info-container">
                        <h4>{title}</h4>

                        {status === 'Released' &&
                            <div>
                                 <StarRatings rating={voteAverage} numberOfStars={10} starRatedColor={'rgb(255,154,0)'}
                                 starDimension="17px" starSpacing="3px"/> ({voteCount} votes)
                            </div>
                        }
                        <p className="movie-desc">Runtime: {runtime} minutes.</p>
                        <p className="movie-desc">{description}</p>

                        <p className="movie-desc"><i>{title} had an estimated budget of ${budget} and a world wide gross of ${revenue}.</i></p>
                    </div>
                </div>
            </div>
        );
    }
}
export default MovieDetails;
