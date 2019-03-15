import React, {Component} from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import './LandingPage.css'
const IMG_BASE_URL = 'http://image.tmdb.org/t/p/original/'

// the page after login, maybe some large images of new films and recommendations for the user?
class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newReleases: [],
            loading: true
        }
    }


    componentDidMount() {
        this.getNewMovies()
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
                <p className="left">Baserat på nuvarande listor....</p>

            </div>
        );
    }
}


export default LandingPage;
