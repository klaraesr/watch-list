import React, {Component} from 'react'
import './ListSlider.css'
import ImageGallery from "react-image-gallery";
import {Link} from "react-router-dom";


// stateless component
class ListSlider extends Component {
    render() {
        return (
            <div>
                <h5 className="titles">{this.props.toWatch ? 'What\'s on your list to see next?' : 'Movies you\'ve seen before...'}</h5>

                {this.props.movies.length === 0 && <p className="no-movies">You don't have any movies in your {this.props.toWatch ? 'to-watch' : 'watched'} list yet.</p>}
                {this.props.movies.length !== 0 &&
                    <div>
                        <div className="custom-gallery">
                            <ImageGallery items={this.props.movies} showThumbnails={false} showFullscreenButton={false}
                                      autoPlay={false} showPlayButton={false} onClick={this.props.handleClick} showNav={true}/>
                        </div>
                        <Link to={this.props.toWatch ? '/towatchlist' : '/watchedlist'}><div className="view-all">View your full {this.props.toWatch ? 'To Watch' : 'Watched'} List</div></Link>
                    </div>}
            </div>
        );
    }
}


export default ListSlider;
