import React, {Component} from 'react';

// the page after login, maybe some large images of new films and recommendations for the user?
class LandingPage extends Component {
    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
            </div>
        );
    }
}

export default LandingPage;
