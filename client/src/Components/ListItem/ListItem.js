import React, {Component} from 'react';
import './ListItem.css'

class ListItem extends Component {
    render() {
        const {movie} = this.props
        return (
            <div className="row list-item">
                <div className="col-sm-7 col-xs-7">
                    <div className="container-item">
                        <h5>{movie.name}</h5>
                        <div className="row half-row">
                            <div className="col-sm-6 col-xs-6">
                                <button className="btn list-btn">Add to the other list</button>
                            </div>
                            <div className="col-sm-6 col-xs-6">
                                <button className="btn list-btn">Remove from list</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 col-xs-5">
                    <img className="list-img" alt={movie.id} src={movie.image}/>
                </div>
            </div>
        );
    }
}

export default ListItem;
