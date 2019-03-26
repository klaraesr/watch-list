import React, {Component} from 'react'
import './LatestAddedList.css'
import ImageGallery from "react-image-gallery";
import {Link} from "react-router-dom";


// stateless component
class WatchList extends Component {
    render() {
        return (
            <div>
                <h5 className="titles">{this.props.toWatch ? 'The latest movies you\'ve added to your to-watch list' : 'The latest movies you\'ve seen'}</h5>

                {this.props.movies.length === 0 && <p className="no-movies">You don't have any movies in your {this.props.toWatch ? 'to-watch' : 'watched'} list yet.</p>}
                {this.props.movies.length !== 0 &&
                    <div>
                        <div className="custom-gallery">
                            <ImageGallery items={this.props.movies} showThumbnails={false} showFullscreenButton={false}
                                      autoPlay={false} showPlayButton={false} onClick={this.props.handleClick} showNav={true}/>
                        </div>
                        <Link to="/movielist/1"><div className="view-all">Click here to view your full {this.props.toWatch ? 'to-watch' : 'watched'} list</div></Link>
                    </div>}
            </div>
        );
    }
}


const items = ['https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all', 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all']
const labelsArr = ['hej', 'hej2', 'hej3']
export default WatchList;
