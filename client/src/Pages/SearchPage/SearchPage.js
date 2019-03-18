import React, {Component} from 'react'

// Design change: Make two columns.. the user should be able to drag and drop the searched item that they want to add på their list
class SearchPage extends Component {
    render() {
        return (
            <div className="container appContainer">
                {this.props.navbar}
            </div>
        );
    }
}

export default SearchPage;
