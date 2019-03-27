import React, {Component} from 'react'
import ProfileHeader from "../Components/ProfileHeader/ProfileHeader"
import LatestAddedList from "../Components/LatestAddedList/LatestAddedList"
import Loader from "react-loader-spinner";

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true, // set to true from beginning when database is connected
            toWatchMovies: null,
            watchedMovies: null,
            userId: this.props.userId,
            username: '',
            userImg: ''
        }
    }

    componentDidMount() {
        fetch('/api/getUser/' + this.state.userId)
            .then(res => res.json())
            .then(data => {
                if(data.userInfo !== 'Not logged in'){
                    this.setState({username: data.username, userImg: data.userImg, loading: false})
                }
            })
            .catch(error => console.log(error))
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
                {this.state.loading && <div className="loader"><Loader type="Oval" color="#FF9A00" height="100" width="100"/></div>}
                {!this.state.loading &&
                <div>
                    <ProfileHeader userName={this.state.username} img={this.state.userImg} toWatch={toWatch} watched={watched}/>
                    <LatestAddedList movies={watchedMovies} toWatch={false} handleClick={this.handleClick}/>
                    <LatestAddedList movies={toWatchMovies} toWatch={true} handleClick={this.handleClick}/>
                </div>}
            </div>

        );
    }
}

// Mock data instead of database

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
