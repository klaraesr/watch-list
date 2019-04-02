import React, {Component} from 'react'
import './MovieList.css'
import Link from "react-router-dom/es/Link";

class MovieList extends Component {

    render() {
        const {movieList, listType} = this.props
        return (
            <div>
                <div id="title"><h4 id="inside-title">{listType}</h4></div>
                <div id="list-container">
                    {movieList.map((movie) => (
                            <div className="list-container-item" key={movie.key}>
                                <Link to={'/moviedetails/' + movie.id}>
                                    <img className="miniature-img" src={movie.image} alt={movie.title}/>
                                </Link>
                                <div className="title-movie-list">{movie.title}</div>
                                <button className={'btn watchlistBtn list-add-btn' + (movie.watchlist_id !== null ? ' active' : '')}>{(movie.watchlist_id === null) ? 'Add to To Watch List' : 'Remove from To Watch List'}</button>
                                <button className={'btn watchlistBtn list-add-btn' + (movie.watchedlist_id !== null ? ' active' : '')}>{(movie.watchedlist_id === null) ? 'Add to Watched List' : 'Remove from Watched List'}</button>
                            </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MovieList;
