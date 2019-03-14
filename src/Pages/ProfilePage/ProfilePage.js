import React, {Component} from 'react'

class ProfilePage extends Component {
    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
            </div>
        );
    }
}

export default ProfilePage;
