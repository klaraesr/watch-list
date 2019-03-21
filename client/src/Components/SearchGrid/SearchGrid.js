import React, {Component} from 'react'
import GridItem from '../GridItem'
import './SearchGrid.css'

class SearchGrid extends Component {

    render() {
        return (
          <div className='grid'>
            <div>
                {this.props.movies.map(movie =>
                  <GridItem className='grid-movie-item' title={movie.title} image={movie.poster_path} release={movie.release_date} id={movie.id} key={movie.id}/>
                )}
            </div>
          </div>
        );
    }
}

export default SearchGrid;
