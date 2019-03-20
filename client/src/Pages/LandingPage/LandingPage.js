import React, {Component} from 'react'
import Gallery from './../../Components/Gallery/Gallery.js'
import './LandingPage.css'
import ImageSlider from "../../Components/ImageSlider/ImageSlider";
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w300/'
const IMG_BASE_URL_LARGE = 'http://image.tmdb.org/t/p/w1280/'

// statefull component
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
                        original: IMG_BASE_URL_LARGE + movie.backdrop_path, // image
                        description: movie.title + ', release date: ' + movie.release_date, // shown on picture
                    }))
                })
            })
            .catch(e => console.log(e))
    }

    getRecommendedMovies = () => {
        this.props.model.getRecommendedMovies()
            .then(data => {
                const movies = data.results.slice(0,9)
                this.setState({
                    recommended: movies.map(movie => ({
                        src: IMG_BASE_URL_SMALL + movie.backdrop_path,
                        title: movie.title,
                        id: movie.id,
                        release: movie.release_date
                    }))
                })
            })
    }

    handleClick = (e) => {
        const ID = e.target.title // actually the id, not the title
        this.props.history.push('/moviedetails/' + ID)
    }

    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
                <ImageSlider movies={this.state.newReleases} loading={this.state.loading} handleClick={this.handleClick}/>
                <Gallery movies={this.state.recommended} loading={this.state.loading}/>
            </div>
        );
    }
}

//const mock = [{"src":"http://image.tmdb.org/t/p/original//w2PMyoyLU22YvrGK3smVM9fW1jj.jpg","title":"Captain Marvel","id":299537,"release":"2019-03-06"},{"src":"http://image.tmdb.org/t/p/original//9QusGjxcYvfPD1THg6oW3RLeNn7.jpg","title":"Aquaman","id":297802,"release":"2018-12-07"},{"src":"http://image.tmdb.org/t/p/original//uUiId6cG32JSRI6RyBQSvQtLjz2.jpg","title":"Spider-Man: Into the Spider-Verse","id":324857,"release":"2018-12-07"},{"src":"http://image.tmdb.org/t/p/original//lvjscO8wmpEbIfOEZi92Je8Ktlg.jpg","title":"Glass","id":450465,"release":"2019-01-16"},{"src":"http://image.tmdb.org/t/p/original//jnOuttTfG9KKpmOZtprC4pA1AlZ.jpg","title":"Mortal Engines","id":428078,"release":"2018-11-27"},{"src":"http://image.tmdb.org/t/p/original//wDN3FIcQQ1HI7mz1OOKYHSQtaiE.jpg","title":"Fantastic Beasts: The Crimes of Grindelwald","id":338952,"release":"2018-11-14"},{"src":"http://image.tmdb.org/t/p/original//88poTBTafMXaz73vYi3c74g0y2k.jpg","title":"Ralph Breaks the Internet","id":404368,"release":"2018-11-20"},{"src":"http://image.tmdb.org/t/p/original//h3KN24PrOheHVYs9ypuOIdFBEpX.jpg","title":"How to Train Your Dragon: The Hidden World","id":166428,"release":"2019-01-03"},{"src":"http://image.tmdb.org/t/p/original//6P3c80EOm7BodndGBUAJHHsHKrp.jpg","title":"Ant-Man and the Wasp","id":363088,"release":"2018-07-04"}]

export default LandingPage;
