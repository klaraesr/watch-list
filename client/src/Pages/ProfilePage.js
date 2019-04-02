import React, {Component} from 'react'
import ProfileHeader from "../Components/ProfileHeader/ProfileHeader"
import LatestAddedSlider from "../Components/LatestAddedSlider/LatestAddedSlider"
import Loader from "react-loader-spinner"
import model from './../Model.js'
import Navbar from "../Components/Navbar/Navbar"
const IMG_BASE_URL_SMALL = 'http://image.tmdb.org/t/p/w780/'
const REPLACEMENT_IMG_LARGE = 'https://i.imgur.com/4aUT01r.png'

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingHeader: true, // set to true from beginning when database is connected
            loadingSliders: true,
            toWatchMovies: null,
            watchedMovies: null,
            toWatchCount: null,
            watchedCount: null,
            userId: this.props.userId,
            username: '',
            userImg: ''
        }
    }

    componentDidMount() {
        model.getUser()
            .then(data => {this.setState({username: data.username, userImg: data.userImg, loadingHeader: false,  toWatchCount: data.toWatchCount, watchedCount: data.watchedCount,})})

        model.getLatestAddedToLists()
            .then(data => {
                this.setState({
                    loadingSliders: false,
                    toWatchMovies: data.toWatchMovies.map(movie => ({
                        original: (movie.image !== null ? IMG_BASE_URL_SMALL + movie.image : REPLACEMENT_IMG_LARGE ),
                        originalTitle: movie.name,
                        originalAlt: movie.id
                    })),
                    watchedMovies: data.watchedMovies.map(movie => ({
                        original: (movie.image !== null ? IMG_BASE_URL_SMALL + movie.image : REPLACEMENT_IMG_LARGE ),
                        originalTitle: movie.name,
                        originalAlt: movie.id
                    }))
                })
            })
    }

    handleClick = (e) => {
        const ID = e.target.alt // actually the id, not the title
        this.props.history.push('/moviedetails/' + ID)
    }

    render() {
        return (
            <div className="container appContainer">
                <Navbar/>
                {(this.state.loadingHeader || this.state.loadingSliders) && <div className="loader"><Loader type="Oval" color="#FF9A00" height="100" width="100"/></div>}
                {!this.state.loadingSliders && !this.state.loadingHeader &&
                <div>
                    <ProfileHeader userName={this.state.username} img={this.state.userImg} watched={this.state.watchedCount} toWatch={this.state.toWatchCount}/>
                    {this.state.toWatchMovies !== null && <LatestAddedSlider movies={this.state.toWatchMovies} toWatch={true} handleClick={this.handleClick}/>}
                    {this.state.watchedMovies !== null && <LatestAddedSlider movies={this.state.watchedMovies} toWatch={false} handleClick={this.handleClick}/>}
                </div>}
            </div>

        );
    }
}

export default ProfilePage;
