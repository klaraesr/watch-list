import React, {Component} from 'react';
import './RecommendedGallery.css'
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

// stateless component
class RecommendedGallery extends Component {

    render() {
        return (
            <div>
                <h4 className="titles">Recommended for you</h4>
                {this.props.noMovies && <p className="recommended-desc"> You don't have any movies in your lists yet. Start adding to get recommendations for you!</p>}

                {!this.props.noMovies && <div>

                    <p className="recommended-desc">Movies recommended for you based upon your lists.</p>
                    {this.props.loading && <Loader type="Oval" color="#FF9A00" height="100" width="100"/>}
                    {!this.props.loading &&
                        <div>
                        <div className="grid-container">
                        {this.props.movies.map(movie =>
                            <Link to={'/moviedetails/' + movie.id} key={movie.id}>
                                <div className="grid-item">
                                    <img className="grid-images" alt={movie.title} src={movie.src}/>
                                    <div className="overlay">
                                        <div className="title">{movie.title}</div>
                                        <div className="release">Release date: {movie.release}</div>
                                    </div>
                                </div>
                            </Link>
                        )}
                        </div>
                        </div>
                    }
                </div>}
            </div>
        );
    }
}

export default RecommendedGallery;
