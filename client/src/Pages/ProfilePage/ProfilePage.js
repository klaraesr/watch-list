import React, {Component} from 'react'
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader"
import WatchList from "../../Components/WatchList/WatchList"


class ProfilePage extends Component {
    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
                <ProfileHeader/>
                <WatchList mode="toWatch"/>
                <WatchList mode="watched"/>
            </div>

        );
    }
}

export default ProfilePage;
