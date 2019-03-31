import React, {Component} from 'react';
import './ListItem.css'

class ListItem extends Component {
    render() {
        const {movie} = this.props
        return (
            <div className="row list-item">
                <div className="col-4 col-sm-4">
                    <div className="container-item">
                        <h6>{movie.name}</h6>
                    </div>
                </div>
                <div className="col-8 col-sm-8">
                        <button className="btn list-btn watchlistBtn">Add to "the other" list</button>
                        <button className="btn list-btn watchlistBtn">Remove from list</button>
                </div>
            </div>
        );
    }
}

export default ListItem;
