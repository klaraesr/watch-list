import React, {Component} from 'react';
import './ListItem.css'

class ListItem extends Component {
    render() {
        const {movie} = this.props
        return (
            <div className="row list-item">
                <div className="col-6 col-sm-8">
                    <div className="container-item">
                        <h5>{movie.name}</h5>
                        <button className="btn list-btn watchlistBtn">Add to "the other" list</button>
                        <button className="btn list-btn watchlistBtn">Remove from list</button>
                    </div>
                </div>
                <div className="col-6 col-sm-4">
                    <img className="list-img" alt={movie.id} src={movie.image}/>
                </div>
            </div>
        );
    }
}

export default ListItem;
