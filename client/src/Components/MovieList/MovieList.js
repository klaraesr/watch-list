import React, {Component} from 'react'
import ListItem from "../ListItem/ListItem"
import './MovieList.css'

class MovieList extends Component {

    render() {
        const {fullList} = this.props
        return (
            <div id="list-container">
                {fullList.map((movie) => (<ListItem movie={movie}/>))}
            </div>
        );
    }
}

export default MovieList;
