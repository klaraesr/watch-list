import React, {Component} from 'react'
import './MovieList.css'
import Link from "react-router-dom/es/Link";

class MovieList extends Component {

    render() {
        const {movieList, listType, inToWatchList, inWatchedList} = this.props
        return (
            <div>
                <div id="title"><h4 id="inside-title">{listType}</h4></div>
                <div id="list-container">
                    {movieList.map((movie) => (
                            <div className="list-container-item" key={movie.id}>
                                <Link to={'/moviedetails/' + movie.movieId}>
                                    <img className="miniature-img" src={movie.image} alt={movie.title}/>
                                </Link>
                                <div className="title-movie-list">{movie.title}</div>
                                <button onClick={() => {this.props.handleBtn(movie.movieId, movie.id, 'inWatchedList', movie.title, movie.imgPath, (inWatchedList[movie.id] ? 'remove' : 'add'))}} className={'btn watchlistBtn list-add-btn' + (inWatchedList[movie.id] ? ' active' : '')}>{inWatchedList[movie.id] ? 'Remove from Watched List' : 'Add to Watched List'}</button>
                                <button onClick={() => {this.props.handleBtn(movie.movieId, movie.id, 'inToWatchList', movie.title, movie.imgPath, (inToWatchList[movie.id] ? 'remove' : 'add'))}} className={'btn watchlistBtn list-add-btn' + (inToWatchList[movie.id] ? ' active' : '')}>{inToWatchList[movie.id] ? 'Remove from To Watch List' : 'Add to To Watch List'}</button>
                            </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default MovieList;
