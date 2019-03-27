import React, {Component} from 'react'
import ListItem from "../ListItem/ListItem"
import './MovieList.css'

class MovieList extends Component {
    render() {
        return (
            <div id="list-container">
                {this.props.watchedList.map((movie) => (<ListItem movie={movie}/>))}
            </div>
        );
    }
}

export default MovieList;
