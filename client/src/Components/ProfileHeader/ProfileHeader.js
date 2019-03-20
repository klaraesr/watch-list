import React, {Component} from 'react'
import './ProfileHeader.css'

// stateless component
class ProfileHeader extends Component {
    render() {
        const {userName, watched, toWatch} = this.props
        return (
            <div id="profileHeader">
                <h2>{userName}</h2>
                <h6>Movies to watch: {toWatch}</h6>
                <h6>Watched movies: {watched}</h6>
            </div>
        );
    }
}

export default ProfileHeader;
