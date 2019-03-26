import React, {Component} from 'react'
import './ProfileHeader.css'

// stateless component
class ProfileHeader extends Component {
    render() {
        const {userName, img, watched, toWatch} = this.props
        return (
            <div className="row no-gutters">
            <div className="col-sm-6 col-xs-6" id="leftCol">
            <img id="profImg" src={img} alt="Profile"/>
            </div>
        <div className="col-sm-6 col-xs-6" id="rightCol">
            <h4>{userName}</h4>
            <h6>Movies to watch: {toWatch}</h6>
            <h6>Watched movies: {watched}</h6>
        </div>
        </div>

        );
    }
}

export default ProfileHeader;
