import React, {Component} from 'react'
import GridItem from '../GridItem/GridItem'
import './SearchGrid.css'

class SearchGrid extends Component {

    render() {
        return (
            <div className='grid-container' id='search-grid'>
                {this.props.movies.map(movie =>
                  <GridItem className='grid-movie-item' id={movie.id} key={movie.id} title={movie.title} image={movie.poster_path} image_backdrop={movie.backdrop_path} release={movie.release_date} summary={movie.overview}/>
                )}
            </div>
        );
    }
}

export default SearchGrid;
