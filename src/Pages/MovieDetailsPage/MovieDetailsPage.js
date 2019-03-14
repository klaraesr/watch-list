import React, {Component} from 'react'

class MovieDetailsPage extends Component {
    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
            </div>
        );
    }
}

export default MovieDetailsPage;
