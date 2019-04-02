import React, {Component} from 'react'
import ImageSlider from "../Components/LandingSlider/LandingSlider"
import model from './../Model.js'
import Navbar from "../Components/Navbar/Navbar"
import RecommendedGallery from "../Components/RecommendedGallery/RecommendedGallery";
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w780/'
const IMG_BASE_URL_LARGE = 'http://image.tmdb.org/t/p/w1280/'
const REPLACEMENT_IMG_SMALL = 'https://i.imgur.com/XW7A8o3.png'
const REPLACEMENT_IMG_LARGE = 'https://i.imgur.com/4aUT01r.png'

// statefull component
class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bool: true,
            newReleases: [],
            loadingNew: true,
            loadingRec: true,
            recommended: [],
            noMovies: false
        }
    }

    componentDidMount() {
        this.getNewMovies()
        this.getRecommendedMovies()
    }


    // fills this.state.newReleases with 5 new movies
    getNewMovies = () => {
        model.getMoviesInTheatre()
            .then(data => {
                const movies = data.results.slice(0,5)
                this.setState({
                    loadingNew: false,
                    newReleases: movies.map(movie => ({
                        // for the slider, thereby the little strange names
                        originalTitle: movie.title,
                        original: (movie.backdrop_path !== null ? IMG_BASE_URL_LARGE + movie.backdrop_path : REPLACEMENT_IMG_LARGE),
                        description: movie.title + ', release date: ' + movie.release_date, // shown on picture
                        originalAlt: movie.id
                    }))
                })
            })
            .catch(e => console.log(e))
    }

    getRecommendedMovies = () => {
       model.getRecommendedMovies()
            .then(data => {
                if(data !== null) {
                    console.log(data)
                    if(data.results.length === 0){
                        console.log("its []")
                        this.setState({noMovies: true})
                    } else {
                        const movies = data.results.slice(0, 9)
                        this.setState({
                            loadingRec: false,
                            recommended: movies.map(movie => ({
                                src: (movie.backdrop_path !== null ? IMG_BASE_URL_SMALL + movie.backdrop_path : REPLACEMENT_IMG_SMALL),
                                title: movie.title,
                                id: movie.id,
                                release: movie.release_date
                            }))
                        })
                    }
                }
            })
    }

    handleClick = (e) => {
        const ID = e.target.alt // actually the id, not the alt, movieDB works weird
        this.props.history.push('/moviedetails/' + ID)
    }

    render() {
        return (
            <div className="container appContainer">
                <Navbar/>
                <ImageSlider movies={this.state.newReleases} loading={this.state.loading} handleClick={this.handleClick}/>
                <RecommendedGallery movies={this.state.recommended} loading={this.state.loadingRec} noMovies={this.state.noMovies}/>
            </div>
        );
    }
}

//const mock = [{"src":"http://image.tmdb.org/t/p/original//w2PMyoyLU22YvrGK3smVM9fW1jj.jpg","title":"Captain Marvel","id":299537,"release":"2019-03-06"},{"src":"http://image.tmdb.org/t/p/original//9QusGjxcYvfPD1THg6oW3RLeNn7.jpg","title":"Aquaman","id":297802,"release":"2018-12-07"},{"src":"http://image.tmdb.org/t/p/original//uUiId6cG32JSRI6RyBQSvQtLjz2.jpg","title":"Spider-Man: Into the Spider-Verse","id":324857,"release":"2018-12-07"},{"src":"http://image.tmdb.org/t/p/original//lvjscO8wmpEbIfOEZi92Je8Ktlg.jpg","title":"Glass","id":450465,"release":"2019-01-16"},{"src":"http://image.tmdb.org/t/p/original//jnOuttTfG9KKpmOZtprC4pA1AlZ.jpg","title":"Mortal Engines","id":428078,"release":"2018-11-27"},{"src":"http://image.tmdb.org/t/p/original//wDN3FIcQQ1HI7mz1OOKYHSQtaiE.jpg","title":"Fantastic Beasts: The Crimes of Grindelwald","id":338952,"release":"2018-11-14"},{"src":"http://image.tmdb.org/t/p/original//88poTBTafMXaz73vYi3c74g0y2k.jpg","title":"Ralph Breaks the Internet","id":404368,"release":"2018-11-20"},{"src":"http://image.tmdb.org/t/p/original//h3KN24PrOheHVYs9ypuOIdFBEpX.jpg","title":"How to Train Your Dragon: The Hidden World","id":166428,"release":"2019-01-03"},{"src":"http://image.tmdb.org/t/p/original//6P3c80EOm7BodndGBUAJHHsHKrp.jpg","title":"Ant-Man and the Wasp","id":363088,"release":"2018-07-04"}]

export default LandingPage;
