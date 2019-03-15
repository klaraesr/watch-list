import React, {Component} from 'react'
import './ProfileHeader.css'


// Should contain the profile name, number of movies watched and movies to watch
class ProfileHeader extends Component {
    render() {
        return (
            <div className="row no-gutters">
                <div className="col-sm-6 col-xs-6" id="leftCol">
                    <h2>{mockData.username}</h2>
                </div>
                <div className="col-sm-6 col-xs-6" id="rightCol">
                    <h6>Movies to watch: {mockData.moviesToWatch}</h6>
                    <h6>Watched movies: {mockData.watchedMovies}</h6>
                </div>

            </div>
        );
    }
}

const mockData =
    {
        username: "Christina",
        watchedMovies: 12,
        moviesToWatch: 7
    }

export default ProfileHeader;
