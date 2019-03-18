import React, {Component} from 'react';
import './Gallery.css'
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

// stateless component
class Gallery extends Component {

    render() {
        return (
            <div>
                <h4 className="titles">Recommended for you</h4>
                <p id="recommended-desc">Movies recommended for you based upon your lists.</p>
                {this.props.loading && <Loader type="Oval" color="#FF9A00" height="100" width="100"/>   }
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
            </div>
        );
    }
}

Gallery.propTypes = {};

export default Gallery;
