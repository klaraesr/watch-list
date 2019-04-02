import React, {Component} from 'react'
import './MovieListFooter.css'

class MovieListFooter extends Component {
    render() {
        return (
            <div className="movie-list-footer">
                {!this.props.noMoreEntries && <button onClick={this.props.handleLoadMore} className="btn watchlistBtn">Load more</button>}
                {this.props.noMoreEntries && <div>There are no more entries in your list.</div>}
            </div>
        );
    }
}

export default MovieListFooter;
