import React, {Component} from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import Gallery from 'react-grid-gallery';
import './LandingPage.css'
const IMG_BASE_URL = 'http://image.tmdb.org/t/p/original/'

// the page after login, maybe some large images of new films and recommendations for the user?
class LandingPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            bool: true,
            newReleases: [],
            loading: true,
            recommended: []
        }
    }


    componentDidMount() {
        this.getNewMovies()
        this.getRecommendedMovies()
    }

    // fills this.state.newReleases with 5 new movies
    getNewMovies = () => {
        this.props.model.getMoviesInTheatre()
            .then(data => {
                const movies = data.results.slice(0,5)
                this.setState({
                    loading: false,
                    newReleases: movies.map(movie => ({
                        // for the slider, thereby the little strange names
                        originalTitle: movie.id, // the id instead of title so that we can get the movie from the api if clicked
                        original: IMG_BASE_URL + movie.backdrop_path, // image
                        description: movie.title + ', release date: ' + movie.release_date, // shown on picture
                    }))
                })
            })
            .catch(e => console.log(e))
    }

    getRecommendedMovies = () => {
        this.props.model.getRecommendedMovies()
            .then(data => {
                const movies = data.results.slice(0,10)
                this.setState({
                    recommended: movies.map(movie => ({
                        src: IMG_BASE_URL + movie.backdrop_path,
                        thumbnail: IMG_BASE_URL + movie.backdrop_path,
                        thumbnailWidth: 40,
                        thumbnailHeight: 40,

                    }))
                })
            })
    }

    handleClick = (e) => {
        console.log(e.target.title) // actually gets the id
    }

    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}

                <h4 className="titles">Newest releases</h4>
                {this.state.loading && "LOADING..."}
                {!this.state.loading &&
                    <ImageGallery items={this.state.newReleases} showThumbnails={false} showFullscreenButton={false}
                              autoPlay={true} showPlayButton={false} onClick={this.handleClick} showNav={false}/>
                }

                <h4 className="titles">Recommended for you</h4>
                <Gallery images={this.state.recommended}/>
            </div>
        );
    }
}


export default LandingPage;
