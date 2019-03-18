import React, {Component} from 'react'
import GridItem from './GridItem'

class SearchGrid extends Component {
    render() {
        return (

            <div id="searchRow" className='row'>
              {this.props.movies.map(movie =>
                <GridItem title={movie.title} image={movie.poster_path} description={movie.overview} id={movie.id}/>
              )}
            </div>
        );
    }
}

export default SearchGrid;
