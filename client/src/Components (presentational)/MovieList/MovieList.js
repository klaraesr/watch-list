import React, {Component} from 'react'
import ListItem from "../ListItem/ListItem"
import './MovieList.css'
import Link from "react-router-dom/es/Link";

class MovieList extends Component {

    render() {
        const {fullList, list} = this.props
        return (
            <div>
                {list === 'toWatchList' && <Link to="/watchedlist"><div id="title"><h4 id="inside-title" data-hover="Click to view your watch list"><span>To Watch List</span></h4></div></Link>}
                {list === 'watchedList' && <Link to="/towatchlist"><div id="title"><h4 id="inside-title" data-hover="Click to view your to watch list">Watched List</h4></div></Link>}
                <div id="list-container">
                    {fullList.map((movie) => (<ListItem movie={movie}/>))}
                </div>
            </div>
        );
    }
}

export default MovieList;
