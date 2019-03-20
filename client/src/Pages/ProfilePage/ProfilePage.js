import React, {Component} from 'react'
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader"
import WatchList from "../../Components/LatestList/LatestList"
import Loader from "react-loader-spinner";


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false, // set to true from beginning when database is connected
            toWatchMovies: null,
            watchedMovies: null
        }
    }

    componentDidMount() {
        // get toWatchMovies, watchedMovies, profile name, and size of lists from database and set loading to false
    }

    handleClick = (e) => {
        const ID = e.target.title // actually the id, not the title
        this.props.history.push('/moviedetails/' + ID)
    }

    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
                <ProfileHeader userName={name} toWatch={toWatch} watched={watched}/>

                {this.state.loading && <div className="loader"><Loader type="Oval" color="#FF9A00" height="100" width="100"/></div>}
                {!this.state.loading &&
                <div>
                    <WatchList movies={watchedMovies} toWatch={false} handleClick={this.handleClick}/>
                    <WatchList movies={toWatchMovies} toWatch={true} handleClick={this.handleClick}/>
                </div>}
            </div>

        );
    }
}


// Mock data instead of database

const name = 'Christina'
const toWatch = 7
const watched = 5

const toWatchMovies = []

const watchedMovies = [
    {
        originalTitle: 297802,
        description: "Avengers",
        original: "https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all"
    },
    {
        originalTitle: 363088,
        description: "Alita Battle angel",
        original: 'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all'
    }
]

export default ProfilePage;
