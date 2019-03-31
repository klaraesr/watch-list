import React, {Component} from 'react'
import './MovieDetails.css'
import StarRatings from "react-star-ratings"

// stateless column
class MovieDetails extends Component {
    render() {
        const {poster, title, description, status, runtime, voteAverage, voteCount, budget, revenue, release} = this.props.movie
        const {inWatchedList, inToWatchList, handleSetWatched, handleSetToWatch} = this.props
        return (
            <div id="movie-details-row" className="row no-gutters">
                <div className="col-xs-6 col-sm-5 col-md-6">
                    <div className="container">
                    <img className="poster" src={poster}/>
                    </div>
                </div>
                <div className="col-xs-8 col-sm-7 col-md-6 right">
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
                        {status !== 'Released' && <p className="movie-desc"><b>Release date is {release}.</b></p>}
                        {budget !== 0 && revenue !== 0 && <p className="movie-desc"><i>{title} had an estimated budget of ${budget} and a world wide gross of ${revenue}.</i></p>}
                        {budget === 0 || revenue === 0 && <p className="movie-desc"><i>Check in later to find out the budget and the world wide gross of {title}.</i></p>}

                        <button onClick={handleSetWatched} type="button" className={'btn watchlistBtn add-btn' + (inWatchedList ? ' active' : '')}>{inWatchedList ? 'This movie is in your watched list, click to remove it' : 'This movie is not in your watched list, click to add it'}</button>
                        <button onClick={handleSetToWatch} type="button" className={'btn watchlistBtn add-btn' + (inToWatchList ? ' active' : '')}>{inToWatchList ? 'This movie is in your to-watch list, click to remove it' : 'This movie is not in your to-watch list, click to add it'}</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default MovieDetails;
